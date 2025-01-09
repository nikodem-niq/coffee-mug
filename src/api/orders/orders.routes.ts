import express from "express";
import { OrdersController } from "./orders.controller.js";
import { validatorMiddleware } from "@/middlewares/validator.js";
import { CreateOrderDto } from "./orders.model.js";
import {
  ServiceContainer,
  Services,
} from "@/common/container/service.container.js";
import { CommandBus } from "@/common/bus/command-bus.js";

export function createOrdersRouter() {
  const ordersRouter = express.Router();

  const container = ServiceContainer.getInstance();
  const commandBus = container.get<CommandBus>(Services.COMMAND_BUS);
  const ordersController = new OrdersController(commandBus);

  ordersRouter.post(
    "/",
    validatorMiddleware(CreateOrderDto),
    (req, res, next) => {
      ordersController.createOrder(req, res, next);
    }
  );

  return ordersRouter;
}
