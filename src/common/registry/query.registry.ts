import { GetProductsByIdsQuery } from "@/api/products/queries/get-products-by-ids/get-products-by-ids.query.js";

import { GET_PRODUCTS_BY_IDS_QUERY } from "@/api/products/queries/get-products-by-ids/get-products-by-ids.query.js";
import { QueryBus } from "../bus/query-bus.js";
import { Database } from "../db/database.js";
import { GetProductsByIdsHandler } from "@/api/products/queries/get-products-by-ids/get-products-by-ids.handler.js";
import {
  IF_SUFFICIENT_STOCK_QUERY,
  IfSufficientStockQuery,
} from "@/api/products/queries/if-sufficient-stock/if-sufficient-stock.query.js";
import { IfSufficientStockHandler } from "@/api/products/queries/if-sufficient-stock/if-sufficient-stock.handler.js";
import { GET_PRODUCTS_QUERY } from "@/api/products/queries/get-products/get-products.query.js";
import { GetProductsHandler } from "@/api/products/queries/get-products/get-products.handler.js";
import { GetProductByIdQuery } from "@/api/products/queries/get-product-by-id/get-product-by-id.query.js";
import { GET_PRODUCT_BY_ID_QUERY } from "@/api/products/queries/get-product-by-id/get-product-by-id.query.js";
import { GetProductByIdHandler } from "@/api/products/queries/get-product-by-id/get-product-by-id.handler.js";

export class QueryRegistry {
  static init(queryBus: QueryBus, db: Database) {
    // Products
    queryBus.register(
      GET_PRODUCTS_BY_IDS_QUERY,
      (query: GetProductsByIdsQuery) =>
        new GetProductsByIdsHandler(db).execute(query)
    );

    queryBus.register(
      IF_SUFFICIENT_STOCK_QUERY,
      (query: IfSufficientStockQuery) =>
        new IfSufficientStockHandler(queryBus).execute(query)
    );

    queryBus.register(GET_PRODUCTS_QUERY, () => {
      return new GetProductsHandler(db).execute();
    });

    queryBus.register(GET_PRODUCT_BY_ID_QUERY, (query: GetProductByIdQuery) => {
      return new GetProductByIdHandler(db).execute(query);
    });
  }
}
