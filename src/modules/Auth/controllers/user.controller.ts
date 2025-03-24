import { Controller, Get } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get('info')
  userInfo() {
    return {
      id: 0,
      realName: 'Vben',
      roles: ['super'],
      username: 'vben',
    };
  }
}
