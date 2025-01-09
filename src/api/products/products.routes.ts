import express from "express";
import { ProductsController } from "./products.controller.js";
import {
  CreateProductDto,
  RestockOrSellProductDto,
  RestockOrSellProductParams,
} from "./products.model.js";
import { validatorMiddleware } from "@/middlewares/validator.js";
import { CommandBus } from "@/common/bus/command-bus.js";
import { QueryBus } from "@/common/bus/query-bus.js";
import {
  ServiceContainer,
  Services,
} from "@/common/container/service.container.js";

export function createProductsRouter() {
  const productsRouter = express.Router();

  const container = ServiceContainer.getInstance();
  const commandBus = container.get<CommandBus>(Services.COMMAND_BUS);
  const queryBus = container.get<QueryBus>(Services.QUERY_BUS);

  const productsController = new ProductsController(commandBus, queryBus);

  productsRouter.get("/", (req, res, next) => {
    productsController.getProducts(req, res, next);
  });

  productsRouter.post(
    "/",
    validatorMiddleware(CreateProductDto),
    (req, res, next) => {
      productsController.addProduct(req, res, next);
    }
  );

  productsRouter.post(
    "/:id/restock",
    validatorMiddleware(RestockOrSellProductParams, "params"),
    validatorMiddleware(RestockOrSellProductDto),
    (req, res, next) => {
      productsController.restockProduct(req, res, next);
    }
  );

  productsRouter.post(
    "/:id/sell",
    validatorMiddleware(RestockOrSellProductParams, "params"),
    validatorMiddleware(RestockOrSellProductDto),
    (req, res, next) => {
      productsController.sellProduct(req, res, next);
    }
  );

  return productsRouter;
}
