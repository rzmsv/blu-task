import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateBookDTO } from './dto/updateBook.dto';
import { NewBookDTO } from './dto/newBook.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BookService {
  constructor(private readonly prismaService: PrismaService) { }
  /* -------------------------------------------------------------------------- */
  /*                                    READ                                    */
  /* -------------------------------------------------------------------------- */
  async bookList_service() {
    try {
      const booksList = await this.prismaService.book.findMany()
      return {
        res: booksList,
        message: []
      }
    } catch (error) {
      throw error
    }
  }
  async bookById_service(id: number) {
    try {
      const findBook = await this.prismaService.book.findFirst({
        where: {
          id: +id
        }
      })
      return {
        res: findBook,
        message: []
      }
    } catch (error) {
      throw error
    }
  }
  /* -------------------------------------------------------------------------- */
  /*                                   UPDATE                                   */
  /* -------------------------------------------------------------------------- */
  async updateBook_service(id: number, data: UpdateBookDTO) {
    try {
      const findBook = await this.prismaService.book.findFirst({
        where: {
          id: +id
        }
      })
      if (!findBook) throw new NotFoundException("Book not found!")
      await this.prismaService.book.update({
        where: {
          id: +id
        },
        data
      })
      return {
        res: "OK",
        message: []
      }
    } catch (error) {
      throw error
    }
  }
  /* -------------------------------------------------------------------------- */
  /*                                   CREATE                                   */
  /* -------------------------------------------------------------------------- */
  async newBook_service(data: NewBookDTO) {
    try {
      const updateBook = await this.prismaService.book.create({ data })
      return {
        res: updateBook,
        message: []
      }
    } catch (error) {
      throw error
    }
  }
  /* -------------------------------------------------------------------------- */
  /*                                   DELETE                                   */
  /* -------------------------------------------------------------------------- */
  async deleteBook_service(id: number) {
    try {
      const findBook = await this.prismaService.book.findFirst({
        where: {
          id: +id
        }
      })
      if (!findBook) throw new NotFoundException("Book not found!")
      const deleteBook = await this.prismaService.book.delete({
        where: {
          id: +id
        }
      })

      return {
        res: "Delete",
        message: []
      }
    } catch (error) {
      throw error
    }
  }
}
