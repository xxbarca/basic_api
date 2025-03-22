import { Body, Controller, Patch, Post } from '@nestjs/common';
import { SpuService } from '@/modules/Mall/services';
import { CreateSpuDto, UpdateSpuDto } from '@/modules/Mall/dtos';
import { omit } from 'lodash';

@Controller('spu')
export class SpuController {
  constructor(private readonly service: SpuService) {}
  @Post()
  async create(@Body() dto: CreateSpuDto) {
    return await this.service.create(dto);
  }

  @Patch()
  async update(@Body() data: UpdateSpuDto) {
    return await this.service.update(data.id, omit(data, ['id']));
  }
}
