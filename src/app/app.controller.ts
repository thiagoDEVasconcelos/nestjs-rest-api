import { Controller } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('home')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @Get('example')
  // example(): string {
  //   return this.appService.solvesProblem();
  // }
}
