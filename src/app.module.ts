import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsModule } from './boards/boards.module';
import { typeORMConfig } from './configs/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig), // forRoot안에 넣어준 설정은 모든 sub module 부수적인 모듈들에 다 적용됨
    BoardsModule,
  ],
})
export class AppModule {}
