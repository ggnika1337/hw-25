import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsString()
  category!: string;

  @IsNotEmpty()
  @IsString()
  description!: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  price!: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  quantity!: number;
}

// export class Product {
//   name!: string;
//   price!: number;
//   quantity!: number;
//   category!: string;
//   description!: string;
// }
