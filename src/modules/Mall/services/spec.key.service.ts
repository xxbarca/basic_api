import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BaseService } from '@/modules/Database/base';
import { SpecKeyEntity } from '@/modules/Mall/entities';
import {
  SpecKeyRepository,
  SpecValueRepository,
} from '@/modules/Mall/repositories';
import { CreateSpecKeyDto } from '@/modules/Mall/dtos';
import { UnifyResponse } from '@/common/Interceptors';

@Injectable()
export class SpecKeyService extends BaseService<
  SpecKeyEntity,
  SpecKeyRepository
> {
  constructor(
    protected repository: SpecKeyRepository,
    protected valRepository: SpecValueRepository,
  ) {
    super(repository);
  }

  async create(data: CreateSpecKeyDto) {
    try {
      return UnifyResponse.success(await this.repository.save(data));
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: string) {
    const values = await this.valRepository.find({
      where: {
        spec_key_id: id,
      },
    });
    await this.valRepository.remove(values);
    return await super.delete(id);
  }
}
