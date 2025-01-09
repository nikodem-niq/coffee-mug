import { createProductsRouter } from "./products.routes.js";

export class ProductsModule {
  static createProductsRouter() {
    return createProductsRouter();
  }
}
