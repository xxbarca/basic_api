import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BaseService } from '@/modules/Database/base';
import { SpuEntity } from '@/modules/Mall/entities';
import { SkuRepository, SpuRepository } from '@/modules/Mall/repositories';
import { CreateSpuDto } from '@/modules/Mall/dtos';
import { UnifyResponse } from '@/common/Interceptors';

@Injectable()
export class SpuService extends BaseService<SpuEntity, SpuRepository> {
  constructor(
    protected repository: SpuRepository,
    protected skuRepository: SkuRepository,
  ) {
    super(repository);
  }
  async create(data: CreateSpuDto) {
    try {
      return UnifyResponse.success(await this.repository.save(data));
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: string) {
    const skuList = await this.skuRepository.find({
      where: {
        spu_id: id,
      },
    });
    await this.skuRepository.remove(skuList);
    return await super.delete(id);
  }
}
