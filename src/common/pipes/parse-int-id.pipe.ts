import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

export class ParseIntIdPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    if (metadata.type !== 'param' || metadata.data !== 'id') return value;
    const parsedValue = Number(value);

    if (isNaN(parsedValue)) {
      throw new BadRequestException('Expects to receive a numeric string');
    }

    if (parsedValue < 0) {
      throw new BadRequestException(
        'Expects to receive a number greater than zero.',
      );
    }

    return parsedValue;
  }
}
