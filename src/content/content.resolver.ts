import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class ContentResolver {
  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
}
