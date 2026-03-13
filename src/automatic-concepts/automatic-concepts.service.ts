import { Injectable } from '@nestjs/common';

@Injectable()
export class AutomaticConceptsService {
  getHome(): string {
    return 'conceitos automaticos';
  }
}
