import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Module({})
export class DatabaseModule {
  static forRoot(config: TypeOrmModuleOptions): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [TypeOrmModule.forRoot(config)],
    };
  }

  static forRootAsync(options: {
    inject: any[];
    useFactory: (
      ...args: any[]
    ) => Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions;
  }): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [TypeOrmModule.forRootAsync(options)],
    };
  }
}
