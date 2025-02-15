import * as controllers from '@/modules/Auth/controllers';
import * as services from '@/modules/Auth/services';
import * as repositories from '@/modules/Auth/repositories';
import { Module } from '@nestjs/common';

@Module({
  controllers: Object.values(controllers),
  providers: [...Object.values(services), ...Object.values(repositories)],
})
export class AuthModule {}
