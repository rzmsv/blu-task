import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { appConfigs } from 'src/configs';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: appConfigs.JWT_SECRET,
    });
  }

  async validate(payload: { userId: number, email: string, role: string }): Promise<{ userId: number, email: string, role: string }> {
    return { userId: payload.userId, email: payload.email, role: payload.role };
  }
}