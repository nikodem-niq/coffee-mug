import { CreateProductDto } from "../../products.model.js";

export const ADD_PRODUCT_COMMAND = "ADD_PRODUCT_COMMAND";

export class AddProductCommand {
  constructor(public readonly product: CreateProductDto) {}
}
