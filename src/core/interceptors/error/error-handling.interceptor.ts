import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
var color = require('colors-cli/safe')
var error = color.red.bold;
var warn = color.yellow;
var notice = color.blue;
const uniqueCodeCollor = color.magenta_bt.underline
@Catch()
export class ErrorFilter<T> implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest()
    const userNumber = request?.user?.mobile || null
    const status = exception["status"]
    const uniqueCode = request.uniqueCode
    const method = request.method
    const path = request.url
    const now = new Date().toLocaleString()
    if (exception["response"]) {
      const errorResponse = exception["response"]
      console.log(`(${error("ERROR!")}) Unique_code: ${uniqueCodeCollor(uniqueCode)}, Type: ${warn("API Error")}, StatusCode: ${status} , Method: ${method}, URL: ${path}, User: ${userNumber}, Date: ${now}\nmessage: ${errorResponse.message}`)
      response.status(status).json({
        uniqueCode,
        result: false,
        timestamp: new Date().toLocaleString(),
        path: request.url,
        message: errorResponse.message,
        message_type: 'error',
        user: userNumber,
        data: {
          statusCode: status,
          error: errorResponse["errorType"]
        },
      });
    } else {
      console.log(`(${error("ERROR!")})) Unique_code: ${uniqueCodeCollor(uniqueCode)}, Type: ${error("Internal Server Error")}, StatusCode: ${501} , Method: ${method}, URL: ${path}, User: ${userNumber}, Date: ${now}\nmessage: ${exception.message || exception}`)
      response.status(400).json({
        uniqueCode,
        result: false,
        timestamp: new Date().toLocaleString(),
        path: request.url,
        message: exception.message || exception,
        message_type: 'error',
        user: userNumber,
        data: {
          statusCode: 400,
          error: "Bad Request"
        },
      });
    }
  }
}