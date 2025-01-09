import { Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

export class BaseController {
  protected async handleRequest<T>(
    action: () => Promise<T>,
    res: Response,
    status: StatusCodes,
    message: string,
    next: NextFunction
  ) {
    try {
      const result = await action();
      return this.successResponse(res, result, status, message);
    } catch (error) {
      next(error);
    }
  }

  protected successResponse<T>(
    res: Response,
    data: T,
    statusCode: StatusCodes = StatusCodes.OK,
    message: string = "Success"
  ) {
    return res.status(statusCode).json({
      statusCode,
      success: true,
      message,
      data,
    });
  }
}
