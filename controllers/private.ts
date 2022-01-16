import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "../utils/errorResponse";



exports.testPrivateRoute = (req: Request, res: Response, next: NextFunction) => {
  res.send("Private route data");
};
