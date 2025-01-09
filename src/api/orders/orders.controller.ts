import { StatusCodes } from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import { CommandBus } from "@/common/bus/command-bus.js";
import {
  CreateOrderCommand,
  CREATE_ORDER_COMMAND,
} from "./commands/create-order/create-order.command.js";
import { v4 as uuidv4 } from "uuid";
import { BaseController } from "@/common/controller.base.js";

export class OrdersController extends BaseController {
  constructor(private readonly commandBus: CommandBus) {
    super();
  }

  async createOrder(req: Request, res: Response, next: NextFunction) {
    const { productsIds, customerId } = req.body;

    return this.handleRequest(
      () =>
        this.commandBus.execute(
          CREATE_ORDER_COMMAND,
          new CreateOrderCommand({
            id: uuidv4(),
            productsIds,
            customerId,
            createdAt: new Date(),
            updatedAt: new Date(),
          })
        ),
      res,
      StatusCodes.CREATED,
      "Order created successfully",
      next
    );
  }
}
