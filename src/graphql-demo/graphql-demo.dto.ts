import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Author {
  @Field(() => Int)
  id: number;

  @Field(() => String, {
    nullable: true,
  })
  firstName?: string;

  @Field(() => String, { nullable: true })
  lastName?: string;
}
