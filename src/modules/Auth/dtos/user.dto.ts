import { IsNotEmpty, IsString, Length } from 'class-validator';
import { PickType } from '@nestjs/swagger';

class UserCommonDto {
  @IsString()
  @IsNotEmpty()
  @Length(5, 20, {
    message: ({ constraints }) => {
      return `用户名长度必须大于${constraints[0]}小于${constraints[1]}`;
    },
  })
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  nickname: string;

  @IsString()
  email: string;

  @IsString()
  phone: string;
}

export class SignInUserDto extends PickType(UserCommonDto, [
  'password',
  'username',
]) {}
