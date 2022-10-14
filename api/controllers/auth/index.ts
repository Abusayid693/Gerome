import crypto from 'crypto';
import {NextFunction, Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import {env} from 'process';
import {Customers} from '../../models/Customers';
import {User} from '../../models/User';
import {ErrorResponse} from '../../utils/errorResponse';
import * as helpers from './helpers';

/**
 *
 */

exports.getUserDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

exports.getUserByEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const email = req.params.email;

  if (!email) {
    res.status(409).json({
      success: false,
      errors: [
        {
          field: 'email',
          message: 'Invalid email'
        }
      ]
    });
  }

  try {
    const user = await User.findOne({email});
    res.status(200).json({
      success: true,
      data: {
        users: user
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 *
 */

exports.token = async (req: Request, res: Response, next: NextFunction) => {
  let token;
  if (
    typeof req.headers.refresh === 'string' &&
    req.headers.refresh.startsWith('Bearer')
  ) {
    // eg:  Bearer evifheiuhgurih....
    token = req.headers.refresh.split(' ')[1];
  }
  if (!token) {
    return next(new ErrorResponse('Unauthorized request', 401));
  }

  try {
    const decoded = jwt.verify(token, env.REFRESH_TOKEN_SECRET) as {id: string};
    const user = await User.findById(decoded?.id);

    if (!user) {
      return next(new ErrorResponse('User not found', 404));
    }
    res.status(200).json({
      success: true,
      data: {
        token: user.getSignedToken(),
        tokenExpires: env.JWT_EXPIRE
      }
    });
  } catch (error) {
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
    next(error);
  }
};

/**
 *
 */

exports.login = async (req: Request, res: Response, next: NextFunction) => {
  const {email, password} = req.body;
  if (!email || !password) {
    return next(new ErrorResponse('Required fields not provided', 400));
  }
  try {
    const user = await User.findOne({email}).select('+password');
    if (!user) {
      return next(new ErrorResponse('User not found', 404));
    }

    const isMatch = await user.matchPasswords(password);

    if (!isMatch) {
      return next(new ErrorResponse('Wrong password', 401));
    }

    res.status(200).json({
      success: true,
      data: {
        token: user.getSignedToken(),
        tokenExpires: env.JWT_EXPIRE,
        refreshToken: user.getSignedRefreshToken(),
        user: {...user.toJSON()}
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 *
 */

exports.forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {email} = req.body;

  try {
    const user = await User.findOne({email});
    if (!user) {
      return next(new ErrorResponse('This email is not registered', 401));
    }

    const resetToken = await user.getResetToken();

    await user.save();

    const resetUrl = `http://localhost:300/reset/${resetToken}`;

    const message = `
    <h1> Reset your password now using this link : </h1>
    <a href=${resetUrl} target="_blank">${resetUrl}</a>
    `;

    try {
      await helpers.sendMail({
        to: email,
        subject: 'Reset your password',
        html: message
      });

      res.status(200).json({
        success: true,
        data: 'Reset mail sent'
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();

      return next(new ErrorResponse('Email sending error', 500));
    }
  } catch (error) {
    next(error);
  }
};

/**
 *
 */

exports.resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resetToken)
    .digest('hex');

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: {$gt: Date.now()}
    });

    if (!user) {
      return next(new ErrorResponse('Reset token invalid', 400));
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
    next(error);
  }

  res.send('Reset password route');
};

exports.removeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {id} = req.body;

  if (!id) {
    res.status(403).json({
      success: false,
      errors: [
        {
          field: 'id',
          message: 'id is required'
        }
      ]
    });
  }
  try {
    const user = await User.findById(id);

    if (!user?._id) {
      res.status(400).json({
        success: true,
        errors: [
          {
            field: 'id',
            message: 'Invalid user'
          }
        ]
      });
    }

    await Customers.deleteMany({adminId: user?._id});
    await user?.remove();

    res.status(200).json({
      success: true,
      data: 'User successfully deleted'
    });
  } catch (error) {
    next(error);
  }
};
