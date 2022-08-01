import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsModule } from './boards/boards.module';
import { typeORMConfig } from './configs/typeorm.config';
import { ContentModule } from './content/content.module';
import { ContentResolver } from './content/content.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gpl',
    }),
    TypeOrmModule.forRoot(typeORMConfig), // forRoot안에 넣어준 설정은 모든 sub module 부수적인 모듈들에 다 적용됨
    BoardsModule,
    ContentModule,
  ],
  providers: [ContentResolver],
})
export class AppModule {}
