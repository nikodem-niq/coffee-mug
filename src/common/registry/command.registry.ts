import { CommandBus } from "../bus/command-bus.js";
import {
  CREATE_ORDER_COMMAND,
  CreateOrderCommand,
} from "@/api/orders/commands/create-order/create-order.command.js";
import { CreateOrderHandler } from "@/api/orders/commands/create-order/create-order.handler.js";
import {
  SELL_PRODUCT_COMMAND,
  SellProductCommand,
} from "@/api/products/commands/sell-product/sell-product.command.js";
import { SellProductHandler } from "@/api/products/commands/sell-product/sell-product.handler.js";
import { QueryBus } from "../bus/query-bus.js";
import { Database } from "../db/database.js";
import { RestockProductCommand } from "@/api/products/commands/restock-product/restock-product.command.js";
import { RESTOCK_PRODUCT_COMMAND } from "@/api/products/commands/restock-product/restock-product.command.js";
import { RestockProductHandler } from "@/api/products/commands/restock-product/restock-product.handler.js";
import { AddProductCommand } from "@/api/products/commands/add-product/add-product.command.js";
import { ADD_PRODUCT_COMMAND } from "@/api/products/commands/add-product/add-product.command.js";
import { AddProductHandler } from "@/api/products/commands/add-product/add-product.handler.js";

export class CommandRegistry {
  static init(commandBus: CommandBus, queryBus: QueryBus, db: Database) {
    // Orders
    commandBus.register(CREATE_ORDER_COMMAND, (command: CreateOrderCommand) =>
      new CreateOrderHandler(db, commandBus, queryBus).execute(command)
    );

    // Products
    commandBus.register(SELL_PRODUCT_COMMAND, (command: SellProductCommand) =>
      new SellProductHandler(db).execute(command)
    );

    commandBus.register(
      RESTOCK_PRODUCT_COMMAND,
      (command: RestockProductCommand) =>
        new RestockProductHandler(db).execute(command)
    );

    commandBus.register(ADD_PRODUCT_COMMAND, (command: AddProductCommand) =>
      new AddProductHandler(db).execute(command)
    );
  }
}
