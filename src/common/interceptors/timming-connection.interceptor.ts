import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { tap } from 'rxjs';

export class TimingConnectionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>) {
    const startTime = Date.now();
    return next.handle().pipe(
      tap(data => {
        const finalTime = Date.now();
        const elapsedTime = finalTime - startTime;
        console.log(
          `The TimingConnectionInterceptor took ${elapsedTime}ms to execute.`,
          data,
        );
      }),
    );
  }
}
