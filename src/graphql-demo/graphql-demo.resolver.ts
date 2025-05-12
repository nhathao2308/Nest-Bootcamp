import { Query, Resolver } from '@nestjs/graphql';
import { Author } from './graphql-demo.dto';

@Resolver(() => Author)
export class graphqlDemoResolver {
  @Query(() => Author)
  async author(): Promise<Author> {
    return { id: 1, firstName: 'Hao', lastName: 'Nguyen' };
  }
}
