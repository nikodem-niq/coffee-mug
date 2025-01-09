export const IF_SUFFICIENT_STOCK_QUERY = "IF_SUFFICIENT_STOCK_QUERY";

export class IfSufficientStockQuery {
  constructor(
    public readonly productIds: string[],
    public readonly stock: number
  ) {}
}
