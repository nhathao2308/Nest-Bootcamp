import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCategoryInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  image_url: string;

  @Field(() => Boolean, { defaultValue: true })
  is_active: boolean;

  @Field(() => String)
  description: string;
}
