import {
  Body,
  Controller,
  Get,
  ParseUUIDPipe,
  Patch,
  Post,
  Param,
  Delete,
} from '@nestjs/common';
import { SpuService } from '@/modules/Mall/services';
import {
  CreateSpuDto,
  PaginateSpuDto,
  UpdateSpuDto,
} from '@/modules/Mall/dtos';
import { omit } from 'lodash';
import { UnifyResponse } from '@/common/Interceptors';

@Controller('spu')
export class SpuController {
  constructor(private readonly service: SpuService) {}
  @Post()
  async create(@Body() dto: CreateSpuDto) {
    return await this.service.create(dto);
  }

  @Patch()
  async update(@Body() data: UpdateSpuDto) {
    return UnifyResponse.success(
      await this.service.update(data.id, omit(data, ['id'])),
    );
  }

  @Get(':id')
  async detail(@Param('id', ParseUUIDPipe) id: string) {
    return UnifyResponse.success(await this.service.detail(id));
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return UnifyResponse.success(await this.service.delete(id));
  }

  @Post('paginate')
  async paginate(@Body() data: PaginateSpuDto) {
    return UnifyResponse.success(await this.service.page(data));
  }
}
