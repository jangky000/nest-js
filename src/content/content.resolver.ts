import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ContentDto } from './content.dto';
import { InputContent } from './content.input';
import { ContentService } from './content.service';

@Resolver('Content')
export class ContentResolver {
  constructor(private readonly contentService: ContentService) {}
  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
  @Query(() => [ContentDto])
  async getContents() {
    return await this.contentService.getProducts();
  }
  @Mutation(() => ContentDto)
  async createProduct(@Args('data') data: InputContent) {
    return await this.contentService.createContent(data);
  }
}
