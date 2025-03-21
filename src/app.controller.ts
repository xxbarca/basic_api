import {
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { IsPublic } from '@/modules/Auth/decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import e from 'express';
import * as path from 'node:path';
import * as sharp from 'sharp';
import * as fs from 'fs';

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

  @IsPublic()
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: Express.Multer.File) {
    return await this.appService.upload(file);
  }

  @IsPublic()
  // @Post('upload')
  @UseInterceptors(
    FileInterceptor('upload', {
      storage: diskStorage({
        destination: './uploads',
        filename(
          req: e.Request,
          file: Express.Multer.File,
          callback: (error: Error | null, filename: string) => void,
        ) {
          const filename = uuidv4() + path.extname(file.originalname);
          callback(null, filename);
        },
      }),
      fileFilter(
        req: e.Request,
        file: Express.Multer.File,
        callback: (error: Error | null, acceptFile: boolean) => void,
      ) {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          return callback(new Error('不支持的类型'), false);
        }
        callback(null, true);
      },
    }),
  )
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const filename = `${path.basename(file.filename, path.extname(file.filename))}.png`;
    const outputFilePath = `./uploads/${filename}`;
    await sharp(file.path)
      .resize(800, 600, {
        fit: sharp.fit.inside,
        withoutEnlargement: true,
      })
      .toFormat('png')
      .png({ quality: 80 })
      .toFile(outputFilePath);
    fs.unlinkSync(outputFilePath);
    return {
      url: `/uploads/${filename}`,
    };
  }
  @IsPublic()
  @Get('cos-signature')
  async getCosSignature(@Query('key') key: string) {
    return await this.appService.getAuth(key);
  }
}
