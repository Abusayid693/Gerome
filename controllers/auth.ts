import { Request, Response, NextFunction } from "express";

exports.register = (req: Request, res: Response, next: NextFunction) => {
  res.send("Register route");
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
 