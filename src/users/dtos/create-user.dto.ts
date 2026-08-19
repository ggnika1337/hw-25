import { IsNumber, IsString } from 'class-validator';
export class CreateUserDto {
  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;

  @IsString()
  email!: string;

  @IsString()
  gender!: string;

  @IsNumber()
  phoneNumber!: number;

  @IsNumber()
  age!: number;
}
