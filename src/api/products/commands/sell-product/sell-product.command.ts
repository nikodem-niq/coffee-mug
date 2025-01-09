export const SELL_PRODUCT_COMMAND = "SELL_PRODUCT_COMMAND";

export class SellProductCommand {
  constructor(public readonly id: string, public readonly stock: number) {}
}
