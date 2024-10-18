var color = require('colors-cli/safe')
var error = color.red.bold;
var warn = color.yellow;
var notice = color.blue;
const uniqueCodeCollor = color.magenta_bt.underline
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
const rand = require('random-key');

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    const request = context.switchToHttp().getRequest()
    const response = context.switchToHttp().getResponse()
    const method = request.method
    const now = new Date().toLocaleString()
    const path = request.url
    const userNumber = request?.user?.mobile || null
    const body = JSON.stringify(request.body)
    const status = response.statusCode
    const uniqueCode = rand.generateDigits(10)
    request.uniqueCode = uniqueCode
    console.log(`(${notice("+++")}) Unique_code: ${uniqueCodeCollor(uniqueCode)}, Http: ${notice("Request")}, Method: ${method}, URL: ${path}, User: ${userNumber}, Date: ${now}\n===> Body: ${body}`)
    return next.handle().pipe(
      map(data => {
        if (data === undefined) {
          throw new BadRequestException()
        }
        console.log(`(${notice("---")}) Unique_code: ${uniqueCodeCollor(uniqueCode)}, Http: ${notice("Response")}, StatusCode: ${status} , Method: ${method}, URL: ${path}, User: ${userNumber}, Date: ${now}`)
        return {
          result: true,
          message: data.message.map((x) => {
            return { message: x };
          }),
          message_type: data.message_type ? data.message_type : 'displayed',
          data: data.res,
        }
      })
    )
  }
}