import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'test',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true, // true 설정 시 애플리케이션을 다시 실행할 때, 엔티티 안에서 수정된 칼럼의 길이 타입 변경 값 등을 해당 테이블을 Drop한 후 다시 생성
};
