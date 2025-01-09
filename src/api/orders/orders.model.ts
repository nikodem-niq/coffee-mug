import { IsArray, IsString } from "class-validator";

export type Order = {
  id: string;
  customerId: string;
  productsIds: string[];
  createdAt: Date;
  updatedAt: Date;
};

export class CreateOrderDto {
  @IsString()
  customerId!: string;

  @IsArray()
  productsIds!: string[];
}
