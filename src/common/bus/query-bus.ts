import { AppError } from "@/middlewares/errorHandler.js";
import { StatusCodes } from "http-status-codes";

type QueryHandler<TQuery, TResult> = (query: TQuery) => Promise<TResult>;

export class QueryBus {
  private handlers = new Map<string, QueryHandler<any, any>>();

  register<TQuery, TResult>(
    queryName: string,
    handler: QueryHandler<TQuery, TResult>
  ) {
    this.handlers.set(queryName, handler);
  }

  async execute<TQuery, TResult>(
    queryName: string,
    query: TQuery
  ): Promise<TResult> {
    const handler = this.handlers.get(queryName);
    if (!handler) {
      throw new AppError(
        `Handler for query ${queryName} not found`,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
    return handler(query);
  }
}
