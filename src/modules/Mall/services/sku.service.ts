import { BaseService } from '@/modules/Database/base';
import { SkuEntity } from '@/modules/Mall/entities';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SkuRepository } from '@/modules/Mall/repositories';
import { CreateSkuDto } from '@/modules/Mall/dtos';
import { UnifyResponse } from '@/common/Interceptors';

@Injectable()
export class SkuService extends BaseService<SkuEntity, SkuRepository> {
  constructor(protected repository: SkuRepository) {
    super(repository);
  }

  async create(data: CreateSkuDto) {
    try {
      const spu_id = data.spu_id;
      let code = data.specs
        .map((item) => `${item.key_id}-${item.value_id}`)
        .join('@');
      code = `${spu_id}$${code}`;
      return UnifyResponse.success(
        await this.repository.save({ ...data, code }),
      );
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
