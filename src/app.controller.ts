import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { IsPublic } from '@/modules/Auth/decorators';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}

  @IsPublic()
  @Get()
  getHello(): string {
    console.log(this.configService);
    return this.configService.get<string>('ENV');
  }
}
