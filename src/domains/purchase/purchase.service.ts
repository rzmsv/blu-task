import { Injectable } from '@nestjs/common';

@Injectable()
export class PurchaseService {
  constructor() { }

  /* -------------------------------------------------------------------------- */
  /*                                   CREATEA                                  */
  /* -------------------------------------------------------------------------- */
  async addToCard_service(userId: number, bookId: number) {
    console.log(userId, bookId)
  }
  /* -------------------------------------------------------------------------- */
  /*                                   DELETE                                   */
  /* -------------------------------------------------------------------------- */
  async deleteFromCard_service(userId: number, bookId: number) {
    console.log(userId, bookId)
  }

}
