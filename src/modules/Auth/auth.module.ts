import * as controllers from '@/modules/Auth/controllers';
import * as services from '@/modules/Auth/services';
import * as repositories from '@/modules/Auth/repositories';
import * as strategies from '@/modules/Auth/strategies';

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ENV_JWT } from '@/constants';

@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>(ENV_JWT.JWT_SECRET),
          signOptions: {
            expiresIn: configService.get<string>(ENV_JWT.JWT_EXPIRED),
          },
        };
      },
    }),
  ],
  controllers: Object.values(controllers),
  providers: [
    ...Object.values(services),
    ...Object.values(repositories),
    ...Object.values(strategies),
  ],
})
export class AuthModule {}
