import { Module, DynamicModule } from '@nestjs/common';
import { GraphQLModule, GqlModuleOptions } from '@nestjs/graphql';

@Module({})
export class GqlDynamicModule {
  static forRoot(config: GqlModuleOptions): DynamicModule {
    return {
      module: GqlDynamicModule,
      imports: [GraphQLModule.forRoot(config)],
    };
  }
}
