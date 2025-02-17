import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@/modules/Auth/auth.module';
import { DatabaseModule } from '@/modules/Database/database.module';
import { APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import {
  ResponseInterceptor,
  SerializeInterceptor,
} from '@/common/Interceptors';
import { AppPipe } from '@/common/providers';
import { JwtAuthGuard } from '@/modules/Auth/guards';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    DatabaseModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
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
