import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "../../utils/errorResponse";
import { User } from "../../models/User";
import crypto from "crypto";

import * as helpers from "./helpers";

exports.register = async (req: Request, res: Response, next: NextFunction) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.create({
      username,
      email,
      password,
    });
    helpers.sendToken(user, 201, res);
  } catch (error) {
    if (helpers.checkIsUserExists(error)) {
      res.status(409).json({
        success: false, 
        errors: [
          {
            field: "email",
            message: "Email already exists",
          },
        ],
      });
    }
    next(error);
  }
};

exports.login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorResponse("Required fields not provided", 400));
  }
  try {
    const user = await User.findOne({ email }).select("+password");
    console.log('user :', user)
    if (!user) {
      return next(new ErrorResponse("User not found", 404));
    }
    console.log("user b:", user);

    const isMatch = await user.matchPasswords(password);
    console.log("user :", user);

    if (!isMatch) {
      return next(new ErrorResponse("Wrong password", 401));
    }

    helpers.sendToken(user, 200, res);
  } catch (error) {
    next(error);
  }
};

exports.forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(new ErrorResponse("This email is not registered", 401));
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
        subject: "Reset your password",
        html: message,
      });

      res.status(200).json({
        success: true,
        data: "Reset mail sent",
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();

      return next(new ErrorResponse("Email sending error", 500));
    }
  } catch (error) {
    next(error);
  }
};

exports.resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return next(new ErrorResponse("Reset token invalid", 400));
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    user.save();
    return res.status(200).json({
      success: true,
      data: "Password reset success",
    });
  } catch (error) {
    next(error);
  }

  res.send("Reset password route");
};
