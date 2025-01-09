import { AppError } from "@/middlewares/errorHandler.js";
import { StatusCodes } from "http-status-codes";

type CommandHandler<TCommand, TResult> = (
  command: TCommand
) => Promise<TResult>;

export class CommandBus {
  private handlers = new Map<string, CommandHandler<any, any>>();

  register<TCommand, TResult>(
    commandName: string,
    handler: CommandHandler<TCommand, TResult>
  ) {
    this.handlers.set(commandName, handler);
  }

  async execute<TCommand, TResult>(
    commandName: string,
    command: TCommand
  ): Promise<TResult> {
    const handler = this.handlers.get(commandName);
    if (!handler) {
      throw new AppError(
        `Handler for command ${commandName} not found`,
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
    return handler(command);
  }
}
