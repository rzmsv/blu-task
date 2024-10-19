import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PurchaseService {
  constructor(private readonly prismaService: PrismaService) { }

  /* -------------------------------------------------------------------------- */
  /*                                   CREATEA                                  */
  /* -------------------------------------------------------------------------- */
  async addToCard_service(userId: number, bookId: number) {
    const data = {
      userId,
      bookId
    }
    try {
      const bookQuantity = await this.prismaService.book.findFirst({
        where: {
          id: +bookId
        },
        select: {
          quantity: true
        }
      })
      if (!bookQuantity) throw new NotFoundException("Book Not found!")
      else if (bookQuantity.quantity === 0) throw new BadRequestException("Book quantity is not enoght!")
      const addToCard = await this.prismaService.purchase.create({ data })
      return {
        res: addToCard,
        message: []
      }
    } catch (error) {
      throw error
    }
  }
  /* -------------------------------------------------------------------------- */
  /*                                   DELETE                                   */
  /* -------------------------------------------------------------------------- */
  async deleteFromCard_service(userId: number, bookId: number) {
    const data = {
      userId,
      bookId,
      is_paid: false
    }
    try {
      const purchaseExist = await this.prismaService.purchase.findFirst({
        where: {
          bookId: +bookId,
          userId,
          is_paid: false
        }
      })
      if (!purchaseExist) throw new NotFoundException("Book Not found!")
      await this.prismaService.purchase.delete({
        where: {
          id: purchaseExist.id,
        }
      })
      return {
        res: "Deleted!",
        message: []
      }
    } catch (error) {
      throw error
    }
  }

}
