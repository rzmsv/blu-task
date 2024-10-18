import { Controller, Delete, Param, Post, UseInterceptors } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { TransformInterceptor } from 'src/core/interceptors/success/success-response.interceptor';

@Controller('purchase')
@UseInterceptors(TransformInterceptor)
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) { }

  /* -------------------------------------------------------------------------- */
  /*                                   CREATE                                   */
  /* -------------------------------------------------------------------------- */
  @Post("add-to-card/:userId/:bookId")
  async addToCard_controller(@Param("userId") userId: number, @Param("bookId") bookId: number) {
    await this.purchaseService.addToCard_service(userId, bookId)
  }

  /* -------------------------------------------------------------------------- */
  /*                                   DELETE                                   */
  /* -------------------------------------------------------------------------- */
  @Delete("delete-from-card/:userId/:bookId")
  async deleteFromCard_controller(@Param("userId") userId: number, @Param("bookId") bookId: number) {
    await this.purchaseService.deleteFromCard_service(userId, bookId)
  }
}
