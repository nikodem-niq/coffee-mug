import { Request, Response, NextFunction } from "express";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { AppError } from "./errorHandler.js";
import { StatusCodes } from "http-status-codes";

type ClassConstructor<T> = {
  new (...args: any[]): T;
};

export const validatorMiddleware = <T extends object>(
  classToValidate: ClassConstructor<T>,
  type: "body" | "params" | "query" = "body"
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const classInstance = plainToClass(classToValidate, req[type]);
      const errors = await validate(classInstance, {
        whitelist: true,
        forbidNonWhitelisted: true,
      });

      if (errors.length > 0) {
        const validationErrors = errors
          .map((error) => Object.values(error.constraints || {}))
          .flat();

        throw new AppError(
          "Validation failed",
          StatusCodes.BAD_REQUEST,
          validationErrors
        );
      }

      req[type] = classInstance;
      next();
    } catch (error) {
      next(error);
    }
  };
};
