import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Content } from './content.entity';
import { InputContent } from './content.input';

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(Content)
    private readonly contentRepository: Repository<Content>,
  ) {}

  async createContent(data: InputContent) {
    return await this.contentRepository.create(data).save();
  }
  async getProducts() {
    return await this.contentRepository.find();
  }
}
