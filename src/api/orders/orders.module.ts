import { createOrdersRouter } from "./orders.routes.js";

export class OrdersModule {
  static createOrdersRouter() {
    return createOrdersRouter();
  }
}
