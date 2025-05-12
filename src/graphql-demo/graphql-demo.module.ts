import { Module } from '@nestjs/common';
import { graphqlDemoResolver } from './graphql-demo.resolver';

@Module({
  providers: [graphqlDemoResolver],
})
export class GraphqlModule {}
