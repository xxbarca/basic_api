import { OnlineStatus } from '@/modules/Mall/constants';
import {
  CategoryEntity,
  SkuEntity,
  Spec,
  SpuEntity,
} from '@/modules/Mall/entities';
import { PickType } from '@nestjs/swagger';
import { DtoValidation } from '@/common/decorators';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { IsDataExist, IsUnique } from '@/modules/Database/constraints';

class CommonSkuDto {
  @IsDataExist(SpuEntity, { always: true, message: 'spu不存在' })
  @IsUUID(undefined, { groups: ['create'], message: 'spu_id格式不正确' })
  @IsOptional({ groups: ['update'] })
  spu_id: string;

  @IsUnique(SkuEntity, { groups: ['create'], message: '该SKU已存在' })
  @IsString()
  @IsNotEmpty({ groups: ['create'], message: 'title不能为空' })
  @IsOptional({ groups: ['update'] })
  title: string;

  @IsNotEmpty({ groups: ['create'], message: 'price不能为空' })
  @IsString()
  @IsOptional({ groups: ['update'] })
  price: string;

  @IsString()
  @IsOptional({ always: true })
  discount_price: string;

  @IsEnum(OnlineStatus)
  @IsOptional({ always: true })
  online: OnlineStatus;

  @IsString()
  @IsOptional({ always: true })
  img: string;

  @IsString()
  @IsNotEmpty({ groups: ['create'], message: 'code不能为空' })
  @IsOptional({ groups: ['update'] })
  code: string;

  @IsDataExist(CategoryEntity, { always: true, message: 'category不存在' })
  @IsUUID(undefined, { groups: ['create'], message: 'category_id格式不正确' })
  @IsString()
  @IsOptional({ groups: ['update'] })
  category_id: string;

  @IsNumber()
  @IsNotEmpty({ groups: ['create'], message: 'stock不能为空' })
  @IsOptional({ groups: ['update'] })
  stock: number;

  @IsNotEmpty({ groups: ['create'], message: 'spec不能为空' })
  @IsOptional({ groups: ['update'] })
  specs: Array<Spec>;
}

@DtoValidation({ groups: ['create'] })
export class CreateSkuDto extends PickType(CommonSkuDto, [
  'spu_id',
  'title',
  'price',
  'discount_price',
  'online',
  'img',
  'code',
  'stock',
  'specs',
  'category_id',
]) {}
