import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class InputContent {
  @Field()
  readonly title!: string;

  @Field(() => String)
  readonly content!: string;
}
