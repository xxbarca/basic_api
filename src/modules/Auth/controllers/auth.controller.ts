import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from '@/modules/Auth/services';
import { SignInUserDto } from '@/modules/Auth/dtos';
import { UserEntity } from '@/modules/Auth/entities';
import { ReqUser } from '@/modules/Auth/decorators';
import { LocalAuthGuard } from '@/modules/Auth/guards';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/signup')
  signup(@Body() dto: SignInUserDto) {
    const { username, password } = dto;
    return this.authService.signup(username, password);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/signIn')
  signIn(@ReqUser() user: ClassToPlain<UserEntity>) {
    console.log(user);
    return this.authService.signIn(user);
  }
}
