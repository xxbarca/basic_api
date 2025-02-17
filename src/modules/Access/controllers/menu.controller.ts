import { Body, Controller, Post } from '@nestjs/common';
import { MenuService } from '@/modules/Access/services';
import { CreateMenuDto } from '@/modules/Access/dtos';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  async create(@Body() data: CreateMenuDto) {
    return await this.menuService.create(data);
  }
}
