import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { appConfigs } from 'src/configs';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          url: appConfigs.DATABASE_URL
        }
      }
    })
  }
}
