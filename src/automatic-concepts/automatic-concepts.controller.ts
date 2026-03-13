import { Controller, Get } from '@nestjs/common';
import { AutomaticConceptsService } from './automatic-concepts.service';

@Controller('automatic-concepts')
export class AutomaticConceptsController {
  constructor(
    private readonly automaticConteptsService: AutomaticConceptsService,
  ) {}

  @Get()
  home(): string {
    return this.automaticConteptsService.getHome();
  }
}
