import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { CommandBus } from "@/common/bus/command-bus.js";
import { QueryBus } from "@/common/bus/query-bus.js";
import {
  GET_PRODUCTS_QUERY,
  GetProductsQuery,
} from "./queries/get-products/get-products.query.js";
import {
  ADD_PRODUCT_COMMAND,
  AddProductCommand,
} from "./commands/add-product/add-product.command.js";
import {
  RESTOCK_PRODUCT_COMMAND,
  RestockProductCommand,
} from "./commands/restock-product/restock-product.command.js";
import {
  SELL_PRODUCT_COMMAND,
  SellProductCommand,
} from "./commands/sell-product/sell-product.command.js";
import { BaseController } from "@/common/controller.base.js";

export class ProductsController extends BaseController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {
    super();
  }

  async getProducts(req: Request, res: Response, next: NextFunction) {
    return this.handleRequest(
      () => this.queryBus.execute(GET_PRODUCTS_QUERY, new GetProductsQuery()),
      res,
      StatusCodes.OK,
      "Products fetched successfully",
      next
    );
  }

  async addProduct(req: Request, res: Response, next: NextFunction) {
    return this.handleRequest(
      () =>
        this.commandBus.execute(
          ADD_PRODUCT_COMMAND,
          new AddProductCommand(req.body)
        ),
      res,
      StatusCodes.CREATED,
      "Product added successfully",
      next
    );
  }

  async restockProduct(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { stock } = req.body;

    return this.handleRequest(
      () =>
        this.commandBus.execute(
          RESTOCK_PRODUCT_COMMAND,
          new RestockProductCommand(id, stock)
        ),
      res,
      StatusCodes.OK,
      "Product restocked successfully",
      next
    );
  }

  async sellProduct(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { stock } = req.body;

    return this.handleRequest(
      () =>
        this.commandBus.execute(
          SELL_PRODUCT_COMMAND,
          new SellProductCommand(id, stock)
        ),
      res,
      StatusCodes.OK,
      "Product sold successfully",
      next
    );
  }
}
