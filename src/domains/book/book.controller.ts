import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { BookService } from './book.service';
import { UpdateBookDTO } from './dto/updateBook.dto';
import { NewBookDTO } from './dto/newBook.dto';
import { TransformInterceptor } from 'src/core/interceptors/success/success-response.interceptor';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from 'src/core/guards/admin.guard';
import { Request } from 'express';

@Controller('book')
@UseGuards(AuthGuard("jwt"))
@UseInterceptors(TransformInterceptor)

export class BookController {
  constructor(private readonly bookService: BookService) { }
  /* -------------------------------------------------------------------------- */
  /*                                    READ                                    */
  /* -------------------------------------------------------------------------- */
  @Get("list")
  @UseGuards(AdminGuard)
  async booksList_controller() {
    const result = await this.bookService.bookList_service()
    return result
  }

  @Get(":id")
  @UseGuards(AdminGuard)
  async bookById_controller(@Param("id") id: number) {
    const result = await this.bookService.bookById_service(id)
    return result
  }
  /* -------------------------------------------------------------------------- */
  /*                                   CREATE                                   */
  /* -------------------------------------------------------------------------- */
  @Post("new")
  @UseGuards(AdminGuard)
  async newBook_controller(@Body() dto: NewBookDTO, @Req() req: Request) {
    const userId = req.user["userId"]
    const result = await this.bookService.newBook_service({ ...dto, userId })
    return result
  }

  /* -------------------------------------------------------------------------- */
  /*                                   UPDATE                                   */
  /* -------------------------------------------------------------------------- */
  @Patch("update/:id")
  @UseGuards(AdminGuard)
  async editBook_controller(@Param("id") id: number, @Body() dto: UpdateBookDTO) {
    const result = await this.bookService.updateBook_service(id, dto)
    return result
  }
  /* -------------------------------------------------------------------------- */
  /*                                   DELETE                                   */
  /* -------------------------------------------------------------------------- */
  @Delete("delete/:id")
  @UseGuards(AdminGuard)
  async deleteBook_controller(@Param("id") id: number) {
    const result = await this.bookService.deleteBook_service(id)
    return result
  }
}
