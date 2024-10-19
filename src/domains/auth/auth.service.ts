import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { SignupDTO } from './dto/signup.dto';
import { LoginDTO } from './dto/login.dto';
import { PrismaService } from '../prisma/prisma.service';
import { hashPassword } from './util/hash-password.util';
import { SignupDAO } from './dao/signup.dao';
import { comparePassword } from './util/compar-password.util';
import { CustomJWTService } from './util/sign-data-login.util';
import { LoginDAO } from './dao/login.dao';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwt: CustomJWTService
  ) { }

  async signup(data: SignupDTO): Promise<SignupDAO> {
    const hashPass = await hashPassword(data.password)
    try {
      const addNewUser = await this.prismaService.user.create({
        data: { ...data, password: hashPass }, select: {
          id: true,
          email: true,
          fullName: true,
          role: true
        }
      })
      return {
        res: addNewUser,
        message: []
      }
    } catch (error) {
      throw error
    }
  }
  async login(data: LoginDTO) {
    try {
      const user = await this.prismaService.user.findFirst({
        where: {
          email: data.email
        },
        select: {
          id: true,
          email: true,
          password: true,
          fullName: true,
          role: true
        }
      })
      if (!user) throw new NotFoundException("User or Password were wrong!")
      const comparePass = await comparePassword(data.password, user.password)
      if (!comparePass) throw new BadRequestException("User or Password were wrong!")
      const accessToken = await this.jwt.accessToken(user)
      return {
        res: accessToken,
        message: []
      }
    } catch (error) {
      throw error
    }
  }
}
