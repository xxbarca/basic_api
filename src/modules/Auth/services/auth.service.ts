import {
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { UserService } from '@/modules/Auth/services';
import { UserEntity } from '@/modules/Auth/entities';
import * as argon2 from 'argon2';
import { ConfigService } from '@nestjs/config';
import { ENV_JWT } from '@/constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    protected readonly userService: UserService,
    protected readonly jwtService: JwtService,
    protected readonly configService: ConfigService,
  ) {}

  async signup(username: string, password: string) {
    return await this.userService.create(username, password);
  }

  async signIn(user: Partial<UserEntity>) {
    return {
      accessToken: await this.generateToken(
        user,
        this.configService.get(ENV_JWT.JWT_EXPIRED),
      ),
      refreshToken: await this.generateToken(
        user,
        this.configService.get(ENV_JWT.JWT_EXPIRED_REFRESH),
      ),
    };
  }

  async generateToken(user: Partial<UserEntity>, expiresIn: string) {
    return await this.jwtService.signAsync(
      {
        username: user.username,
        id: user.id,
      },
      {
        expiresIn,
      },
    );
  }

  async validateUser(username: string, pass: string) {
    const user = await this.userService.findByName(username);
    if (!user) {
      throw new ForbiddenException('用户不存在');
    }
    const isPasswordValid = await argon2.verify(user.password, pass);
    if (!isPasswordValid) {
      throw new ForbiddenException('用户名或密码错误');
    }
    return {
      id: user.id,
      username: user.username,
    };
  }
}
