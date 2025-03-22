import { Body, Controller, Post } from '@nestjs/common';
import { SpecKeyService, SpecValueService } from '@/modules/Mall/services';
import { CreateSpecKeyDto, CreateSpecValueDto } from '@/modules/Mall/dtos';

@Controller('spec')
export class SpecController {
  constructor(
    private keyService: SpecKeyService,
    private valueService: SpecValueService,
  ) {}

  @Post('key')
  async createKey(@Body() data: CreateSpecKeyDto) {
    return await this.keyService.create(data);
  }

  @Post('value')
  async createValue(@Body() data: CreateSpecValueDto) {
    return await this.valueService.create(data);
  }
}
