import { Controller, Get } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get('info')
  userInfo() {
    return {
      username: '李杨',
      userId: 'XXX',
      realName: '李杨',
      roles: ['super'],
    };
  }
}
