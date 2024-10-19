import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { appConfigs } from 'src/configs';

@Injectable()
export class CustomJWTService {
  constructor(
    private jwtService: JwtService
  ) { }
  async accessToken(user: any): Promise<string> {
    const payload = { email: user.email, role: user.role, userId: user.id };
    return this.jwtService.sign(payload, { secret: appConfigs.JWT_SECRET })
  }
}