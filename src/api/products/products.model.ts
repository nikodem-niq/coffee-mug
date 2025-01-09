import { Type } from "class-transformer";
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Min,
} from "class-validator";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
};

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50, { message: "Name must be less than 50 characters" })
  name!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsNumber()
  @Min(0, { message: "Price must be greater or equal to 0" })
  @Type(() => Number)
  price!: number;

  @IsNumber()
  @Min(0, { message: "Stock must be greater or equal to 0" })
  @Type(() => Number)
  stock!: number;
}

export class RestockOrSellProductParams {
  @IsString()
  @IsNotEmpty()
  id!: string;
}

export class RestockOrSellProductDto {
  @IsNumber()
  @Min(1, { message: "Restock or sell number must be greater than 0" })
  @Type(() => Number)
  stock!: number;
}
