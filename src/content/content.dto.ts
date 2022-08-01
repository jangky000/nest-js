import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ContentDto {
  @Field()
  readonly id!: number;

  @Field()
  readonly title!: string;

  @Field()
  readonly content!: string;
}
