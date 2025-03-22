import { PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { IsDataExist, IsUnique } from '@/modules/Database/constraints';
import { DtoValidation } from '@/common/decorators';
import { SpecKeyEntity, SpecValueEntity } from '@/modules/Mall/entities';

class CommonSpecKeyDto {
  @IsUnique(SpecKeyEntity, { always: true, message: '该KEY已经存在' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional({ always: true })
  unit: string;
}

class CommonSpecValueDto {
  @IsUnique(SpecValueEntity, { always: true, message: '该VALUE已经存在' })
  @IsString()
  @IsNotEmpty()
  value: string;

  @IsDataExist(SpecKeyEntity, { always: true, message: '该spec_key_id不存在' })
  @IsUUID()
  @IsNotEmpty()
  spec_key_id: string;
}

@DtoValidation({ groups: ['create'] })
export class CreateSpecKeyDto extends PickType(CommonSpecKeyDto, [
  'name',
  'unit',
]) {}

@DtoValidation({ groups: ['create'] })
export class CreateSpecValueDto extends PickType(CommonSpecValueDto, [
  'value',
  'spec_key_id',
]) {}
