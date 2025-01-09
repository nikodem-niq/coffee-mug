import { AppError } from "@/middlewares/errorHandler.js";
import { StatusCodes } from "http-status-codes";
import { Product } from "../../products.model.js";
import { Database } from "@/common/db/database.js";
import { SellProductCommand } from "./sell-product.command.js";

export class SellProductHandler {
  constructor(private db: Database) {}

  async execute(command: SellProductCommand): Promise<Product> {
    try {
      await this.db.read();
      const product = this.db.data.products.find(
        (product) => product.id === command.id
      );

      if (!product) {
        throw new AppError("Product not found", StatusCodes.NOT_FOUND);
      }
      if (product.stock < command.stock) {
        throw new AppError("Insufficient stock", StatusCodes.BAD_REQUEST);
      }

      product.stock -= command.stock;
      await this.db.write();
      return product;
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError(
        "Failed to sell product",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}
