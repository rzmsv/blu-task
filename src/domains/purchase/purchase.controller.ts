import { Controller, Delete, Param, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { TransformInterceptor } from 'src/core/interceptors/success/success-response.interceptor';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('purchase')
@UseInterceptors(TransformInterceptor)
@UseGuards(AuthGuard("jwt"))
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) { }

  /* -------------------------------------------------------------------------- */
  /*                                   CREATE                                   */
  /* -------------------------------------------------------------------------- */
  @Post("add-to-card/:bookId")
  async addToCard_controller(@Param("bookId") bookId: number, @Req() req: Request) {
    const userId = req.user["userId"]
    const result = await this.purchaseService.addToCard_service(userId, +bookId)
    return result
  }

  /* -------------------------------------------------------------------------- */
  /*                                   DELETE                                   */
  /* -------------------------------------------------------------------------- */
  @Delete("delete-from-card/:bookId")
  async deleteFromCard_controller(@Param("bookId") bookId: number, @Req() req: Request) {
    const userId = req.user["userId"]
    const result = await this.purchaseService.deleteFromCard_service(userId, +bookId)
    return result
  }
}
