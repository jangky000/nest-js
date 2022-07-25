import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentRepository } from './content.repository';
import { ContentResolver } from './content.resolver';
import { ContentService } from './content.service';

@Module({
  imports: [TypeOrmModule.forFeature([ContentRepository])],
  providers: [ContentService, ContentResolver],
})
export class ContentModule {}
