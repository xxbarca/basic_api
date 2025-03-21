import { Body, Controller, Post } from '@nestjs/common';
import { CreateCategoryDto } from '@/modules/Mall/dtos';
import { CategoryService } from '@/modules/Mall/services';

@Controller('category')
export class CategoryController {
  constructor(private service: CategoryService) {}
  @Post()
  async create(@Body() data: CreateCategoryDto) {
    return await this.service.create(data);
  }
}
