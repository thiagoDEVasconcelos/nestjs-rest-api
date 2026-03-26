import { Injectable } from '@nestjs/common';

@Injectable()
export class MessagesUtils {
  invertString(str: string) {
    return str.split('').reverse().join('');
  }
}

@Injectable()
export class MessagesUtilsMock {
  invertString(str: string) {
    console.log('MOCKED MessagesUtils', str);
  }
}
