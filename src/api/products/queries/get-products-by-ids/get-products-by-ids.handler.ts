import { Product } from "../../products.model.js";
import { GetProductsByIdsQuery } from "./get-products-by-ids.query.js";
import { Database } from "@/common/db/database.js";
import { AppError } from "@/middlewares/errorHandler.js";
import { StatusCodes } from "http-status-codes";

export class GetProductsByIdsHandler {
  constructor(private db: Database) {}

  async execute(query: GetProductsByIdsQuery): Promise<Product[]> {
    try {
      await this.db.read();
      const foundProducts = this.db.data.products.filter((product) =>
        query.ids.includes(product.id)
      );

      const foundIds = foundProducts.map((product) => product.id);
      const missingIds = query.ids.filter((id) => !foundIds.includes(id));

      if (missingIds.length > 0) {
        throw new AppError(
          `Products not found: ${missingIds.join(", ")}`,
          StatusCodes.NOT_FOUND
        );
      }

      return foundProducts;
    } catch (error) {
      if (error instanceof AppError) throw error;
      throw new AppError(
        "Failed to get products",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}
