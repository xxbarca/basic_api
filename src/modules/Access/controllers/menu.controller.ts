import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { MenuService } from '@/modules/Access/services';
import { CreateMenuDto } from '@/modules/Access/dtos';
import { UnifyResponse } from '@/common/Interceptors';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  async create(@Body() data: CreateMenuDto) {
    return await this.menuService.create(data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.menuService.delete(id);
  }

  @Get('list')
  async list() {
    return UnifyResponse.success(await this.menuService.list());
  }
}
