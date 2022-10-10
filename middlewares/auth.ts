import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "process";
import { User } from "../models/User";
import { ErrorResponse } from "../utils/errorResponse";

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // eg:  Bearer evifheiuhgurih....
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new ErrorResponse("Unauthorized request", 401));
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as { id: string };
    const user = await User.findById(decoded?.id);

    if (!user) {
      return next(new ErrorResponse("User not found", 404));
    }
    req.user = user;

    next();
  } catch (error) {
    return next(new ErrorResponse("Unauthorized request", 401));
  }
};
