/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';

@Catch(BadRequestException)
export class MyExceptionFilter<
  T extends BadRequestException,
> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const context = host.switchToHttp();
    // const statusCode = exception.getStatus();
    // const request = context.getRequest();

    const response = context.getResponse();

    response.status(404).json({
      message: 'Oops... :(',
    });
  }
}
