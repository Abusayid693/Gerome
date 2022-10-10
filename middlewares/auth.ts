import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "../utils/errorResponse";
import jwt from "jsonwebtoken";
import { env } from "process";
import { User } from "../models/User";

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
    const decoded = jwt.verify(token, env.JWT_SECRET);
    // @ts-ignore
    const user = await User.findById(decoded?.id);

    if (!user) {
      return next(new ErrorResponse("User not found", 404));
    }
    req.user = user;

    next()
  } catch (error) {
    return next(new ErrorResponse("Unauthorized request", 401));
  }
};
