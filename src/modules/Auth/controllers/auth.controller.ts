import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from '@/modules/Auth/services';
import { SignInUserDto } from '@/modules/Auth/dtos';
import { UserEntity } from '@/modules/Auth/entities';
import { IsPublic, ReqUser } from '@/modules/Auth/decorators';
import { LocalAuthGuard } from '@/modules/Auth/guards';
import { UnifyResponse } from '@/common/Interceptors';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/signup')
  signup(@Body() dto: SignInUserDto) {
    const { username, password } = dto;
    return UnifyResponse.success(this.authService.signup(username, password));
  }

  @UseGuards(LocalAuthGuard)
  @IsPublic()
  @Post('/signIn')
  async signIn(@ReqUser() user: ClassToPlain<UserEntity>) {
    return UnifyResponse.success(await this.authService.signIn(user));
  }

  @IsPublic()
  @Post('/refresh')
  async refresh(@Body() dto: { token: string }) {
    const { token } = dto;
    const result = await this.authService.verifyToken(token);
    return this.authService.signIn(result);
  }
}
