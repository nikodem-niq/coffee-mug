import { logger } from "@/index.js";
import { ErrorRequestHandler } from "express";
import { StatusCodes } from "http-status-codes";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  logger.error(err);
  if (err instanceof AppError) {
    res
      .status(err.statusCode)
      .json({ message: err.message, errors: err.errors, success: err.success });
  } else {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error", success: false });
  }
};

export class AppError extends Error {
  success: boolean;
  statusCode: StatusCodes;
  errors?: any[];

  constructor(message: string, statusCode: StatusCodes, errors?: any[]) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.success = false;
    Error.captureStackTrace(this, this.constructor);
  }
}
