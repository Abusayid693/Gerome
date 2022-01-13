import { Request, Response, NextFunction } from "express";
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
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({
      success: false,
      error: "Provide all required fields",
    });
  }
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      res.status(404).json({
        success: false,
        error: "User not found",
      });
    }
    console.log("user b:",user)

    const isMatch = await user.matchPasswords(password);
    console.log("user :",user)

    if (!isMatch) {
      res.status(404).json({
        success: false,
        error: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      token: "ewfetbtgerger",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      token: error.message,
    });
  }
};

exports.forgotPassword = (req: Request, res: Response, next: NextFunction) => {
  res.send("Forgot password route");
};

exports.resetPassword = (req: Request, res: Response, next: NextFunction) => {
  res.send("Reset password route");
};
