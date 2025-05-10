import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BaseService } from '@/modules/Database/base';
import { CategoryEntity } from '@/modules/Mall/entities';
import { CategoryRepository } from '@/modules/Mall/repositories';
import { CreateCategoryDto, UpdateCategoryDto } from '@/modules/Mall/dtos';
import { UnifyResponse } from '@/common/Interceptors';
import { omit } from 'lodash';
import { OnlineStatus } from '@/modules/Mall/constants';

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

  async updateData(data: UpdateCategoryDto) {
    try {
      if (data.parent_id === data.id) {
        return UnifyResponse.error('父分类不能是自己');
      }
      return UnifyResponse.success(
        await super.update(data.id, omit(data, ['id'])),
      );
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async switchStatus(id: string) {
    const children = await this.repository.find({
      where: {
        parent_id: id,
      },
    });
    const category = await this.repository.findOne({
      where: { id },
    });
    const status =
      category.online === OnlineStatus.ONLINE
        ? OnlineStatus.OFFLINE
        : OnlineStatus.ONLINE;

    try {
      if (children && children.length > 0) {
        for (const child of children) {
          if (category.online === OnlineStatus.ONLINE) {
            await this.repository.update(child.id, {
              online: OnlineStatus.OFFLINE,
            });
          }
        }
      }

      await this.repository.update(id, { online: status });
      return UnifyResponse.success('修改状态成功');
    } catch (e) {
      console.error(e);
      return UnifyResponse.error('修改状态失败');
    }
  }
}
