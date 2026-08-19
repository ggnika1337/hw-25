import { IsNumber, IsString } from 'class-validator';

export class CreateExpenseDto {
  @IsString()
  category!: string;

  @IsString()
  productName!: string;

  @IsNumber()
  quantity!: number;

  @IsNumber()
  price!: number;
}
