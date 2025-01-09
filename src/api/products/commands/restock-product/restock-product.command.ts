export const RESTOCK_PRODUCT_COMMAND = "RESTOCK_PRODUCT_COMMAND";

export class RestockProductCommand {
  constructor(public readonly id: string, public readonly stock: number) {}
}
