import { Module } from '@nestjs/common';
import { ManualConceptsController } from './manual-concepts.controller';
import { ManualConceptsService } from './manual-conepts.service';

@Module({
  controllers: [ManualConceptsController],
  providers: [ManualConceptsService],
})
export class ManualConceptsModule {}
