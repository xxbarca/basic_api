import { Controller, Get } from '@nestjs/common';
import { UnifyResponse } from '@/common/Interceptors';

@Controller('user')
export class UserController {
  @Get('info')
  userInfo() {
    return UnifyResponse.success({
      id: 0,
      realName: 'Vben',
      roles: ['super'],
      username: 'vben',
    });
  }
}
