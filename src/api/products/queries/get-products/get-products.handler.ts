import { Product } from "../../products.model.js";
import { AppError } from "@/middlewares/errorHandler.js";
import { StatusCodes } from "http-status-codes";
import { Database } from "@/common/db/database.js";

export class GetProductsHandler {
  constructor(private db: Database) {}

  async execute(): Promise<Product[]> {
    try {
      await this.db.read();
      return this.db.data.products;
    } catch (error) {
      throw new AppError(
        "Failed to get products",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}
