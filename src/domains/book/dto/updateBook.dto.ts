import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class UpdateBookDTO {
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
}