import { OnlineStatus } from '@/modules/Mall/constants';
import { PartialType, PickType } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  ValidateIf,
} from 'class-validator';
import { IsDataExist, IsUnique } from '@/modules/Database/constraints';
import { CategoryEntity, SpuEntity } from '@/modules/Mall/entities';
import { DtoValidation } from '@/common/decorators';
import { PaginateOptions } from '@/modules/Database/types';
import { Transform } from 'class-transformer';
import { toNumber } from 'lodash';

class CommonSpuDto {
  @IsUnique(SpuEntity, { groups: ['create'], message: '该SPU已存在' })
  @IsString()
  @IsOptional({ groups: ['update'] })
  title: string;

  @IsString()
  @ValidateIf((value) => value.subtitle !== null && value.subtitle)
  @IsOptional({ always: true })
  subtitle: string;

  @IsDataExist(CategoryEntity, { always: true, message: 'category不存在' })
  @IsUUID(undefined, { always: true, message: 'category_id格式不正确' })
  @IsString()
  category_id: string;

  // @IsDataExist(CategoryEntity, { always: true, message: 'root_category不存在' })
  // @IsUUID(undefined, { always: true, message: 'root_category_id格式不正确' })
  // @IsString()
  // root_category_id: string;

  @IsEnum(OnlineStatus, {
    message: `是否在线的取值范围是 [${OnlineStatus.ONLINE}, ${OnlineStatus.OFFLINE}]`,
  })
  @IsOptional({ always: true })
  online: OnlineStatus;

  @IsString()
  @IsNotEmpty({ always: true })
  price: string;

  @IsOptional({ always: true })
  sketch_spec_id: string;

  @IsOptional({ always: true })
  default_sku_id: string;

  @IsOptional({ always: true })
  img: string;

  @IsString()
  @IsOptional({ always: true })
  discount_price: string;

  @IsString()
  @IsOptional({ always: true })
  description: string;
}

@DtoValidation({ groups: ['create'] })
export class CreateSpuDto extends PickType(CommonSpuDto, [
  'title',
  'subtitle',
  'category_id',
  // 'root_category_id',
  'online',
  'price',
  'sketch_spec_id',
  'default_sku_id',
  'img',
  'discount_price',
  'description',
]) {}

@DtoValidation({ groups: ['update'] })
export class UpdateSpuDto extends PartialType(CommonSpuDto) {
  @IsDataExist(SpuEntity, { always: true, message: '该SPU不存在' })
  @IsUUID()
  @IsNotEmpty({ message: 'id不能为空' })
  id: string;
}

export class PaginateSpuDto
  extends PartialType(CommonSpuDto)
  implements PaginateOptions
{
  @Transform(({ value }) => toNumber(value))
  @Min(1, { message: '当前页必须大于1' })
  @IsNumber()
  page?: number = 1;

  @Transform(({ value }) => toNumber(value))
  @Min(1, { message: '每页显示数据必须大于10' })
  @IsNumber()
  limit?: number = 10;
}
