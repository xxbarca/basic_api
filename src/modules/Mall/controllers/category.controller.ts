import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Get,
  Delete,
} from '@nestjs/common';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
  PaginateCategoryDto,
} from '@/modules/Mall/dtos';
import { CategoryService } from '@/modules/Mall/services';
import { omit } from 'lodash';
import { UnifyResponse } from '@/common/Interceptors';

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

  @Post('paginate')
  async paginate(@Body() data: PaginateCategoryDto) {
    return UnifyResponse.success(await this.service.page(data));
  }

  @Get(':id')
  async detail(@Param('id', ParseUUIDPipe) id: string) {
    const category = await this.service.detail(id);
    if (category.parent_id) {
      category.parent = await this.service.detail(category.parent_id);
    }
    return UnifyResponse.success(category);
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return await this.service.delete(id);
  }

  @Get('/all/list')
  async list() {
    return UnifyResponse.success(await this.service.list());
  }
}
