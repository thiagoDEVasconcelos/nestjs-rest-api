import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, throwError } from 'rxjs';

export class ErrorHandlingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>) {
    return next.handle().pipe(
      catchError(error => {
        return throwError(() => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          if (error.name === 'NotFoundException') {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            return new BadRequestException(error.message);
          }

          return new BadRequestException('An unknown error occurred.');
        });
      }),
    );
  }
}
