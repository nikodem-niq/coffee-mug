import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
import { errorHandler } from "@/middlewares/errorHandler.js";
import pino from "pino";
import { env } from "./common/config/config.js";
import { initializeDb } from "./common/db/database.js";
import { QueryRegistry } from "./common/registry/query.registry.js";
import { OrdersModule } from "./api/orders/orders.module.js";
import { CommandRegistry } from "./common/registry/command.registry.js";
import { QueryBus } from "./common/bus/query-bus.js";
import { CommandBus } from "./common/bus/command-bus.js";
import {
  ServiceContainer,
  Services,
} from "./common/container/service.container.js";
import { ProductsModule } from "./api/products/products.module.js";

dotenv.config();

const logger = pino({
  transport: {
    target: "pino-pretty",
    options: {
      singleLine: true,
    },
  },
});

logger.info("Starting server...");

const bootstrap = async () => {
  const app = express();
  const container = ServiceContainer.getInstance();

  logger.info("Initializing database...");
  const db = await initializeDb();

  app.use(express.json());

  const commandBus = new CommandBus();
  const queryBus = new QueryBus();

  container.set(Services.COMMAND_BUS, commandBus);
  container.set(Services.QUERY_BUS, queryBus);
  container.set(Services.DATABASE, db);

  CommandRegistry.init(commandBus, queryBus, db);
  QueryRegistry.init(queryBus, db);

  app.use("/api/orders", OrdersModule.createOrdersRouter());
  app.use("/api/products", ProductsModule.createProductsRouter());

  app.use(errorHandler);

  app.listen(env.PORT, () => {
    logger.info(`Server is running on port ${env.PORT}`);
  });
};

bootstrap();

export { logger };
