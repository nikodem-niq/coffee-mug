import { Order } from "../../orders.model.js";
import { AppError } from "@/middlewares/errorHandler.js";
import { StatusCodes } from "http-status-codes";
import { CreateOrderCommand } from "./create-order.command.js";
import { Database } from "@/common/db/database.js";
import { CommandBus } from "@/common/bus/command-bus.js";
import {
  SELL_PRODUCT_COMMAND,
  SellProductCommand,
} from "../../../products/commands/sell-product/sell-product.command.js";
import {
  IF_SUFFICIENT_STOCK_QUERY,
  IfSufficientStockQuery,
} from "@/api/products/queries/if-sufficient-stock/if-sufficient-stock.query.js";
import { QueryBus } from "@/common/bus/query-bus.js";

export class CreateOrderHandler {
  constructor(
    private readonly db: Database,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  async execute(command: CreateOrderCommand): Promise<Order> {
    try {
      const orderWithId: Order = command.order;

      const ifSufficientStock = await this.queryBus.execute(
        IF_SUFFICIENT_STOCK_QUERY,
        new IfSufficientStockQuery(orderWithId.productsIds, 1)
      );

      if (!ifSufficientStock) {
        throw new AppError(
          "Insufficient stock of some products",
          StatusCodes.BAD_REQUEST
        );
      }

      this.db.data.orders.push(orderWithId);
      await this.db.write();

      for (const productId of orderWithId.productsIds) {
        await this.commandBus.execute(
          SELL_PRODUCT_COMMAND,
          new SellProductCommand(productId, 1)
        );
      }

      return orderWithId;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      throw new AppError(
        "Failed to create order",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}
