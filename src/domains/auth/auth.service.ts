import { Injectable } from '@nestjs/common';
import { SignupDTO } from './dto/signup.dto';
import { LoginDTO } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor() { }

  async signup(dto: SignupDTO) {
    return {
      res: dto,
      message: []
    }
  }
  async login(dto: LoginDTO) {
    console.log(dto)
  }
}
