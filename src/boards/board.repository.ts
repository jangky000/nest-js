import { EntityRepository, Repository } from 'typeorm';
import { Board } from './board.entity';
import { BoardStatus } from './board.model';
import { CreateBoardDto } from './dto/createBoard.dto';

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
  // DB 관련 로직 추가
  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const { title, description } = createBoardDto;
    const board = this.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    });

    await this.save(board); // db에 만들어진 객체를 저장
    return board;
  }
}
