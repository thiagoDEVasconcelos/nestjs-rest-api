import { Controller, Get } from '@nestjs/common';
import { ManualConceptsService } from './manual-conepts.service';

@Controller('manual-concepts')
export class ManualConceptsController {
  constructor(private readonly manualConceptsService: ManualConceptsService) {}

  @Get()
  home(): string {
    return 'Manual concepts';
  }
}
