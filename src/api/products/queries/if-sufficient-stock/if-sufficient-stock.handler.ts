import {
  GET_PRODUCTS_BY_IDS_QUERY,
  GetProductsByIdsQuery,
} from "../get-products-by-ids/get-products-by-ids.query.js";
import { IfSufficientStockQuery } from "./if-sufficient-stock.query.js";
import { QueryBus } from "@/common/bus/query-bus.js";
import { Product } from "../../products.model.js";

export class IfSufficientStockHandler {
  constructor(private readonly queryBus: QueryBus) {}

  async execute(query: IfSufficientStockQuery): Promise<boolean> {
    const products: Product[] = await this.queryBus.execute(
      GET_PRODUCTS_BY_IDS_QUERY,
      new GetProductsByIdsQuery(query.productIds)
    );
    return products.every((product: Product) => product.stock >= query.stock);
  }
}
