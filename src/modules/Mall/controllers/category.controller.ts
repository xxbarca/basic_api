import { Body, Controller, Patch, Post } from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from '@/modules/Mall/dtos';
import { CategoryService } from '@/modules/Mall/services';
import { omit } from 'lodash';

@Controller('category')
export class CategoryController {
  constructor(private service: CategoryService) {}
  @Post()
  async create(@Body() data: CreateCategoryDto) {
    return await this.service.create(data);
  }

  @Patch()
  async update(@Body() data: UpdateCategoryDto) {
    return await this.service.update(data.id, omit(data, ['id']));
  }
}
