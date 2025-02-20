import { NextFunction, Request, Response } from "express";
import { HttpException } from "../utils/exceptions";

export const errorMiddleware = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.status(error.status).json({
    message: error.message,
    errors: error.errors,
  });
};
