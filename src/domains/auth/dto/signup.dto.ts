import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class SignupDTO {

  @IsNotEmpty()
  @IsString()
  email: string

  @IsNotEmpty()
  @IsString()
  password: string

  @IsOptional()
  @IsString()
  fullName?: string

}