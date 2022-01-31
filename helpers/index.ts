import { Request, Response, NextFunction } from "express";

export const sendToken = (user: any, statusCode: number, res: Response) => {
    const token = user.getSignedToken();
    res.status(statusCode).json({
      success: true,
      token,
    });
  };
  