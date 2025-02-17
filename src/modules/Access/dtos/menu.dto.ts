import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { AccessStatus, AccessType } from '@/modules/Access/enums';
import { toNumber } from 'lodash';
import { PickType } from '@nestjs/swagger';

class CommonMenuDto {
  @IsString()
  @ValidateIf((o) => o.type !== AccessType.BUTTON)
  component: string;

  @IsString()
  icon: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Transform(({ value }) => toNumber(value))
  @IsOptional()
  orderNo: number;

  @IsString()
  @IsOptional()
  @ValidateIf((o) => o.type !== AccessType.BUTTON)
  path: string;

  @IsUUID()
  @IsString()
  @IsOptional()
  parent: string;

  @IsEnum(AccessStatus)
  @IsOptional()
  status: AccessStatus;

  @IsEnum(AccessType)
  @IsOptional()
  type: AccessType;

  @IsString()
  @ValidateIf((o) => o.type === AccessType.BUTTON)
  @IsOptional()
  value: string;
}

export class CreateMenuDto extends PickType(CommonMenuDto, [
  'name',
  'component',
  'path',
  'type',
  'status',
  'parent',
  'value',
]) {}
