import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator"

enum UserType {
  "ADMIN",
  "USER"
}
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

  @IsOptional()
  @IsEnum(UserType)
  role: "USER" | "ADMIN" = "USER"
}