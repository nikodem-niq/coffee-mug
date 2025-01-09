import { AppError } from "@/middlewares/errorHandler.js";
import { StatusCodes } from "http-status-codes";
import { Product } from "../../products.model.js";
import { Database } from "@/common/db/database.js";
import { RestockProductCommand } from "./restock-product.command.js";

export class RestockProductHandler {
  constructor(private db: Database) {}

  async execute(command: RestockProductCommand): Promise<Product> {
    try {
      await this.db.read();
      const product = this.db.data.products.find(
        (product) => product.id === command.id
      );

      if (!product) {
        throw new AppError("Product not found", StatusCodes.NOT_FOUND);
      }

      product.stock += command.stock;
      await this.db.write();
      return product;
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError(
        "Failed to restock product",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}
