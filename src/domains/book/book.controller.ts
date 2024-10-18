import { Body, Controller, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import { BookService } from './book.service';
import { UpdateBookDTO } from './dto/updateBook.dto';
import { NewBookDTO } from './dto/newBook.dto';
import { TransformInterceptor } from 'src/core/interceptors/success/success-response.interceptor';

@Controller('book')
@UseInterceptors(TransformInterceptor)
export class BookController {
  constructor(private readonly bookService: BookService) { }
  /* -------------------------------------------------------------------------- */
  /*                                    READ                                    */
  /* -------------------------------------------------------------------------- */
  @Get("list")
  async booksList_controller() {
    await this.bookService.bookList_service()
  }
  @Get(":id")
  async bookById_controller(@Param("id") id: number) {
    await this.bookService.bookById_service(id)
  }
  /* -------------------------------------------------------------------------- */
  /*                                   CREATE                                   */
  /* -------------------------------------------------------------------------- */
  @Post("new")
  async newBook_controller(@Body() dto: NewBookDTO) {
    await this.bookService.newBook_service(dto)
  }

  /* -------------------------------------------------------------------------- */
  /*                                   UPDATE                                   */
  /* -------------------------------------------------------------------------- */
  @Patch("update/:id")
  async editBook_controller(@Param("id") id: number, @Body() dto: UpdateBookDTO) {
    await this.bookService.updateBook_service(id, dto)
  }
  /* -------------------------------------------------------------------------- */
  /*                                   DELETE                                   */
  /* -------------------------------------------------------------------------- */
  @Delete("delete/:id")
  async deleteBook_controller(@Param("id") id: number) {
    await this.bookService.deleteBook_service(id)
  }
}
