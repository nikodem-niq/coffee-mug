import { Order } from "../../orders.model.js";

export const CREATE_ORDER_COMMAND = "CREATE_ORDER_COMMAND";

export class CreateOrderCommand {
  constructor(public readonly order: Order) {}
}
