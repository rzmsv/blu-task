import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { CustomJWTService } from './util/sign-data-login.util';
import { JwtStrategy } from './strategy/auth.strategy';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({})
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService, JwtStrategy, CustomJWTService]
})
export class AuthModule { }
