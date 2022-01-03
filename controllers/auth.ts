import { Request, Response, NextFunction } from "express";
import { User } from "../models/User"

exports.register = async (req: Request, res: Response, next: NextFunction) => {

  const { username, email, password } = req.body;

  try {
    const user = await User.create({
      username, email, password
    })

    res.status(201).json({
      success: true,
      data: user
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    })
  }
};

exports.login = (req: Request, res: Response, next: NextFunction) => {
  res.send("Login route");
};

exports.forgotPassword = (req: Request, res: Response, next: NextFunction) => {
  res.send("Forgot password route");
};

exports.resetPassword = (req: Request, res: Response, next: NextFunction) => {
  res.send("Reset password route");
};
