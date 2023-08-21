import { Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

const errorHandler = (
  error: any,
  res: Response,
  customMessage?: string,
  next?: NextFunction
) => {
  console.error(error);

  const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const message =
    customMessage || error.message || "An internal server error occurred";

  res.status(statusCode).json({
    message: message,
    error: process.env.NODE_ENV === "development" ? error : {},
  });

  if (next) {
    next();
  }
};

export default errorHandler;
