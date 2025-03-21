import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@/modules/Auth/auth.module';
import { DatabaseModule } from '@/modules/Database/database.module';
import { AccessModule } from '@/modules/Access/access.module';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import * as dotenv from 'dotenv';

import {
  ResponseInterceptor,
  SerializeInterceptor,
} from '@/common/Interceptors';
import { AppPipe } from '@/common/providers';
import { JwtAuthGuard } from '@/modules/Auth/guards';
import { MallModule } from '@/modules/Mall/mall.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ErrorFilter } from '@/common/filters/error.filter';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
      load: [() => dotenv.config({ path: '.env' })],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    DatabaseModule,
    AuthModule,
    AccessModule,
    MallModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // },
    {
      provide: APP_FILTER,
      useClass: ErrorFilter,
    },
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: ResponseInterceptor,
    // },
    {
      provide: APP_INTERCEPTOR,
      useClass: SerializeInterceptor,
    },
    {
      provide: APP_PIPE,
      useValue: new AppPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
        forbidUnknownValues: true,
        validationError: { target: false },
      }),
      // useValue: new ValidationPipe({
      //   transform: true,
      //   whitelist: true,
      //   forbidNonWhitelisted: true,
      //   forbidUnknownValues: true,
      //   validationError: {
      //     target: false,
      //   },
      // }),
    },
  ],
})
export class AppModule {}
