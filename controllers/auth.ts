import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "../utils/errorResponse";
import { User } from "../models/User";

exports.register = async (req: Request, res: Response, next: NextFunction) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.create({
      username,
      email,
      password,
    });

    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
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
    if (!user) {
      return next(new ErrorResponse("User not found", 404));
    }
    console.log("user b:", user);

    const isMatch = await user.matchPasswords(password);
    console.log("user :", user);

    if (!isMatch) {
      return next(new ErrorResponse("Wrong password", 401));
    }
    res.status(200).json({
      success: true,
      token: "ewfetbtgerger",
    });
  } catch (error) {
    next(error);
  }
};

exports.forgotPassword = (req: Request, res: Response, next: NextFunction) => {
  res.send("Forgot password route");
};

exports.resetPassword = (req: Request, res: Response, next: NextFunction) => {
  res.send("Reset password route");
};
