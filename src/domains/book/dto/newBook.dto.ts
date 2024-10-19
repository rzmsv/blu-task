import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class NewBookDTO {
  @IsNotEmpty()
  @IsString()
  title: string

  @IsNotEmpty()
  @IsString()
  author: string

  @IsNotEmpty()
  @IsNumber()
  published_year: number

  @IsNotEmpty()
  @IsString()
  genre: string

  @IsNotEmpty()
  @IsNumber()
  quantity: number

  @IsOptional()
  @IsNumber()
  userId: number
}