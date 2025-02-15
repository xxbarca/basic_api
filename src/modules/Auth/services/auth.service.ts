import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UserService } from '@/modules/Auth/services';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    protected readonly userService: UserService,
  ) {}
  async signup(username: string, password: string) {
    return await this.userService.create(username, password);
  }
}
