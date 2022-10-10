import { NextFunction, Request, Response } from "express";

exports.testPrivateRoute = (req: Request, res: Response, next: NextFunction) => {
  res.send("Private route data");
};
