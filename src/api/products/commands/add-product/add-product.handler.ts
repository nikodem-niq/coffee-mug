import { Product } from "../../products.model.js";
import { AddProductCommand } from "./add-product.command.js";
import { v4 as uuidv4 } from "uuid";
import { AppError } from "@/middlewares/errorHandler.js";
import { StatusCodes } from "http-status-codes";
import { Database } from "@/common/db/database.js";

export class AddProductHandler {
  constructor(private db: Database) {}

  async execute(command: AddProductCommand): Promise<Product> {
    const productWithId: Product = {
      ...command.product,
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    try {
      await this.db.read();
      this.db.data.products.push(productWithId);
      await this.db.write();
      return productWithId;
    } catch (error) {
      throw new AppError(
        "Failed to add product",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}
