import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { SignupDTO } from './dto/signup.dto';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/login.dto';
import { TransformInterceptor } from 'src/core/interceptors/success/success-response.interceptor';

@Controller('auth')
@UseInterceptors(TransformInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) { }


  @Post("new")
  async signup(@Body() dto: SignupDTO) {
    const result = await this.authService.signup(dto)
    return result
  }

  @Post("login")
  async login(@Body() dto: LoginDTO) {
    await this.authService.login(dto)
  }
}
