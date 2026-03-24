import { NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

export class SimpleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('First Middleware');
    next();
  }
}
