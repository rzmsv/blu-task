import { Injectable } from '@nestjs/common';
import { UpdateBookDTO } from './dto/updateBook.dto';
import { NewBookDTO } from './dto/newBook.dto';

@Injectable()
export class BookService {
  constructor() { }
  /* -------------------------------------------------------------------------- */
  /*                                    READ                                    */
  /* -------------------------------------------------------------------------- */
  async bookList_service() {
    console.log("list of books")
  }
  async bookById_service(id: number) {
    console.log(id)
  }
  /* -------------------------------------------------------------------------- */
  /*                                   UPDATE                                   */
  /* -------------------------------------------------------------------------- */
  async updateBook_service(id: number, data: UpdateBookDTO) {
    console.log(id, data)
  }
  /* -------------------------------------------------------------------------- */
  /*                                   CREATE                                   */
  /* -------------------------------------------------------------------------- */
  async newBook_service(data: NewBookDTO) {
    console.log(data)
  }
  /* -------------------------------------------------------------------------- */
  /*                                   DELETE                                   */
  /* -------------------------------------------------------------------------- */
  async deleteBook_service(id: number) {
    console.log(id)
  }
}
