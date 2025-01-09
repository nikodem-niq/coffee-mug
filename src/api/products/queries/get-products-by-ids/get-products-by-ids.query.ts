export const GET_PRODUCTS_BY_IDS_QUERY = "GET_PRODUCTS_BY_IDS_QUERY";

export class GetProductsByIdsQuery {
  constructor(public readonly ids: string[]) {}
}
