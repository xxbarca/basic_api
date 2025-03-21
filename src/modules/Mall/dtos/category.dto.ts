import { PartialType, PickType } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';
import { IsDataExist, IsUnique } from '@/modules/Database/constraints';
import { CategoryEntity } from '@/modules/Mall/entities';
import { Transform } from 'class-transformer';
import { DtoValidation } from '@/common/decorators';
import { CategoryStatus } from '@/modules/Mall/constants';

class CommonCategoryDto {
  @IsUnique(CategoryEntity, {
    groups: ['create'],
    message: '分类名已存在',
  })
  @IsString()
  @IsNotEmpty({ groups: ['create'], message: '分类名不能为空' })
  @IsOptional({ groups: ['update'] })
  name: string;

  @IsString()
  @IsOptional({ always: true })
  description: string;

  @IsDataExist(CategoryEntity, { always: true, message: '父分类不存在' })
  @IsUUID(undefined, { always: true, message: '父分类ID格式不正确' })
  @ValidateIf((value) => value.parent_id !== null && value.parent_id)
  @IsString()
  @IsOptional({ always: true })
  parent_id: string;

  @IsString()
  @IsOptional()
  img: string;

  @IsNumber()
  @Transform(({ value }) => (value == 'null' ? null : Number(value)))
  @IsOptional({ always: true })
  index: number;

  @IsEnum(CategoryStatus, {
    message: `是否在线的取值范围是 [${CategoryStatus.ONLINE}, ${CategoryStatus.OFFLINE}]`,
  })
  @IsOptional({ always: true })
  online: CategoryStatus;
}

@DtoValidation({ groups: ['create'] })
export class CreateCategoryDto extends PickType(CommonCategoryDto, [
  'name',
  'description',
  'parent_id',
  'img',
  'index',
]) {}

@DtoValidation({ groups: ['update'] })
export class UpdateCategoryDto extends PartialType(CommonCategoryDto) {
  @IsDataExist(CategoryEntity, { always: true, message: '分类不存在' })
  @IsUUID()
  @IsNotEmpty({ message: 'id不能为空' })
  id: string;
}
