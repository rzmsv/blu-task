import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule } from './domains/auth/auth.module';
import { BookModule } from './domains/book/book.module';
import { PrismaModule } from './domains/prisma/prisma.module';
import { PurchaseModule } from './domains/purchase/purchase.module';

@Module({
  imports: [AuthModule, BookModule, PrismaModule, PurchaseModule],
  providers: [AppService],
})
export class AppModule { }
