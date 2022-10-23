import * as Sentry from '@sentry/node';
import crypto from 'crypto';
import {NextFunction, Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import {env} from 'process';
import {Ses} from '../../config/aws';
import {Customers} from '../../models/Customers';
import {d1} from '../../models/d1';
import {User} from '../../models/User';
import jwtService from '../../services/jwt';
import redisService from '../../services/redis';
import * as errorResponse from '../../utils/errorResponse';
import * as helpers from './helpers';

/**
 *
 */

exports.getUserDetails = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;

  res.status(200).json({
    success: true,
    data: {
      user: {...user.toJSON()}
    }
  });
};

/**
 *
 */

exports.getUserByEmail = async (req: Request, res: Response, next: NextFunction) => {
  const email = req.params.email;
  const admin = req.user;

  if (!email) {
    return next(new errorResponse.ErrorResponse('Required fields not provided', 400));
  }

  try {
    const user = await User.find({
      $and: [{email: email}, {email: {$ne: admin.email}}]
    });

    res.status(200).json({
      success: true,
      data: {
        users: user
      }
    });
  } catch (error) {
    Sentry.captureException(`Error occoured at ${__filename}.getUserByEmail: ${error}`);
    return next(error);
  }
};

/**
 *
 */

exports.getUserByUsername = async (req: Request, res: Response, next: NextFunction) => {
  const username = req.params.username;
  const admin = req.user;

  if (!username) {
    return next(new errorResponse.ErrorResponse('Required fields not provided', 400));
  }

  try {
    const user = await User.find({
      $and: [{username: username}, {email: {$ne: admin.email}}]
    });

    res.status(200).json({
      success: true,
      data: {
        users: user
      }
    });
  } catch (error) {
    Sentry.captureException(`Error occoured at ${__filename}.getUserByUsername: ${error}`);
    return next(error);
  }
};

/**
 *
 */

exports.token = async (req: Request, res: Response, next: NextFunction) => {
  let token;
  if (typeof req.headers.refresh === 'string' && req.headers.refresh.startsWith('Bearer')) {
    // eg:  Bearer evifheiuhgurih....
    token = req.headers.refresh.split(' ')[1];
  }
  if (!token) {
    return next(new errorResponse.ErrorResponse('Unauthorized request', 401));
  }

  try {
    if ((await redisService.get({key: token})) !== '1') throw new errorResponse.NotFoundResponse('Invalid refresh token');
    const decoded = jwt.verify(token, env.JWT_REFRESH_SECRET) as {id: string};
    const user = await User.findById(decoded?.id);

    if (!user) {
      throw new errorResponse.NotFoundResponse('Invalid refresh token or token expired');
    }
    res.status(200).json({
      success: true,
      data: {
        token: jwtService.getAccessToken(user._id as string),
        tokenExpires: env.JWT_EXPIRE
      }
    });
  } catch (error) {
    Sentry.captureException(`Error occoured at ${__filename}.token: ${error}`);
    next(error);
  }
};

/**
 *
 */

exports.register = async (req: Request, res: Response, next: NextFunction) => {
  const {username, email, password} = req.body;

  try {
    await User.create({
      username,
      email,
      password
    });

    res.status(201).json({
      success: true,
      data: 'User successfully registered'
    });
  } catch (error) {
    if (helpers.checkIsUserExists(error)) {
      res.status(409).json({
        success: false,
        errors: [
          {
            field: 'email',
            message: 'Email already exists'
          }
        ]
      });
    }
    Sentry.captureException(`Error occoured at ${__filename}.register: ${error}`);
    next(error);
  }
};

/**
 *
 */

exports.login = async (req: Request, res: Response, next: NextFunction) => {
  const {email, password} = req.body;
  if (!email || !password) {
    return next(new errorResponse.ErrorResponse('Required fields not provided', 400));
  }
  try {
    const user = await User.findOne({email}).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        errors: [
          {
            field: 'email',
            message: 'Email not registered'
          }
        ]
      });
    }

    const isMatch = await user.matchPasswords(password);
    if (!isMatch) {
      return res.status(409).json({
        success: false,
        errors: [
          {
            field: 'password',
            message: 'wrong password'
          }
        ]
      });
    }

    const token = jwtService.getAccessToken(user._id as string);
    const refreshToken = jwtService.getRefreshToken(user._id as string);
    await redisService.set({key: refreshToken, value: '1'});

    res.status(200).json({
      success: true,
      data: {
        token,
        tokenExpires: env.JWT_EXPIRE,
        refreshToken,
        user: {...user.toJSON()}
      }
    });
  } catch (error) {
    Sentry.captureException(`Error occoured at ${__filename}.login: ${error}`);
    next(error);
  }
};

/**
 *
 */

exports.forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
  const {email} = req.body;
  if (!email) return next(new errorResponse.ErrorResponse('Required fields not provided', 400));
  try {
    const user = await User.findOne({email});
    if (!user) {
      res.status(400).json({
        success: false,
        errors: [
          {
            field: 'email',
            message: 'email is not registered'
          }
        ]
      });
      return;
    }

    const resetToken = await user.getResetToken();
    await user.save();
    const resetUrl = `http://localhost:300/reset/${resetToken}`;

    const params = {
      Source: 'abusayid693@gmail.com',
      Destination: {
        ToAddresses: [email]
      },
      Message: {
        Body: {
          Text: {
            Data: resetUrl
          }
        },
        Subject: {
          Data: 'Test mail'
        }
      }
    };

    try {
      await Ses.sendEmail(params).promise();
      res.status(200).json({
        success: true,
        data: 'Reset mail sent'
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();
      throw new Error(error);
    }
  } catch (error) {
    Sentry.captureException(`Error occoured at ${__filename}.forgotPassword: ${error}`);
    console.log('[Error] :', error);
    return next(error);
  }
};

/**
 *
 */

exports.resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  const resetPasswordToken = crypto.createHash('sha256').update(req.params.resetToken).digest('hex');
  if (!resetPasswordToken) return next(new errorResponse.ErrorResponse('Required fields not provided', 400));
  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: {$gt: Date.now()}
    });

    if (!user) {
      res.status(400).json({
        success: false,
        errors: [
          {
            field: 'email',
            message: 'email is not registered'
          }
        ]
      });
      return;
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    user.save();
    return res.status(200).json({
      success: true,
      data: 'Password reset success'
    });
  } catch (error) {
    Sentry.captureException(`Error occoured at ${__filename}.resetPassword: ${error}`);
    next(error);
  }
};

/**
 *
 */

exports.removeUser = async (req: Request, res: Response, next: NextFunction) => {
  const adminId = req.user._id;
  try {
    await d1.deleteMany({adminId});
    await Customers.deleteMany({adminId});
    await User.findByIdAndRemove(adminId);

    res.status(200).json({
      success: true,
      data: 'User successfully deleted'
    });
  } catch (error) {
    Sentry.captureException(`Error occoured at ${__filename}.removeUser: ${error}`);
    next(error);
  }
};
