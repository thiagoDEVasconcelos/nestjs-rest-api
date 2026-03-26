import { DynamicModule, Module } from '@nestjs/common';

export type ConfigsType = {
  apiKey: string;
  apiUrl: string;
};

@Module({})
export class MyDynamicModule {
  static register(configs: ConfigsType): DynamicModule {
    console.log(configs);
    return {
      module: MyDynamicModule,
      imports: [],
      providers: [],
      controllers: [],
      exports: [],
    };
  }
}
