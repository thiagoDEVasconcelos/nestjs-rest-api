import { NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

export class SecondMiddlaware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Second middleware');
    next();
  }
}
