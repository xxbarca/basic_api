import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '@/modules/Auth/services';
import { SignInUserDto } from '@/modules/Auth/dtos';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/signup')
  signup(@Body() dto: SignInUserDto) {
    const { username, password } = dto;
    return this.authService.signup(username, password);
  }
}
