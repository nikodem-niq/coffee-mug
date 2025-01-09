import { Product } from "../../products.model.js";
import { GetProductByIdQuery } from "./get-product-by-id.query.js";
import { Database } from "@/common/db/database.js";
import { AppError } from "@/middlewares/errorHandler.js";
import { StatusCodes } from "http-status-codes";

export class GetProductByIdHandler {
  constructor(private db: Database) {}

  async execute(query: GetProductByIdQuery): Promise<Product> {
    try {
      await this.db.read();
      const product = this.db.data.products.find(
        (product) => product.id === query.id
      );

      if (!product) {
        throw new AppError("Product not found", StatusCodes.NOT_FOUND);
      }
      return product;
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError("Failed to get product", StatusCodes.NOT_FOUND);
    }
  }
}
