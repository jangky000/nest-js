import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';

@Module({
  imports: [TypeOrmModule.forFeature([BoardRepository])], // boards 모듈에서만 사용
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}
