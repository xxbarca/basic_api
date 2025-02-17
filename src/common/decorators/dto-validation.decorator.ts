import { ValidationOptions } from 'class-validator';
import { ClassTransformOptions } from 'class-transformer';
import { Paramtype, SetMetadata } from '@nestjs/common';

export const DTO_VALIDATION_OPTIONS = 'dto_validation_options';

export const DtoValidation = (
  options?: ValidationOptions & {
    transformOptions?: ClassTransformOptions;
  } & {
    type?: Paramtype;
  },
) => SetMetadata(DTO_VALIDATION_OPTIONS, options ?? {});
