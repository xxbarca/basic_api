import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BaseService } from '@/modules/Database/base';
import { CategoryEntity } from '@/modules/Mall/entities';
import { CategoryRepository } from '@/modules/Mall/repositories';
import { CreateCategoryDto } from '@/modules/Mall/dtos';
import { UnifyResponse } from '@/common/Interceptors';
import { omit } from 'lodash';

@Injectable()
export class CategoryService extends BaseService<
  CategoryEntity,
  CategoryRepository
> {
  constructor(protected repository: CategoryRepository) {
    super(repository);
  }

  async delete(id: string) {
    const children = await this.repository.find({
      where: {
        parent_id: id,
      },
    });
    if (children && children.length > 0) {
      for (const child of children) {
        child.parent_id = null;
        await super.update(child.id, omit(child, ['id']));
      }
    }
    return await super.delete(id);
  }

  async create(data: CreateCategoryDto) {
    try {
      return UnifyResponse.success(await this.repository.save(data));
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
