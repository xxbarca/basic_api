import { Controller, Post } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Post('info')
  userInfo() {
    return {
      username: '李杨',
      userId: 'XXX',
      realName: '李杨',
    };
  }
}
