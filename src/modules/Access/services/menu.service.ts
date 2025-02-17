import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BaseService } from '@/modules/Database/base';
import { MenuEntity } from '@/modules/Access/entities';
import { MenuRepository } from '@/modules/Access/repositories';
import { CreateMenuDto } from '@/modules/Access/dtos';
import { AccessType } from '@/modules/Access/enums';

@Injectable()
export class MenuService extends BaseService<MenuEntity, MenuRepository> {
  constructor(protected repository: MenuRepository) {
    super(repository);
  }

  async create(data: CreateMenuDto) {
    const parent = data.parent
      ? await this.repository.findOne({
          where: { id: data.parent },
        })
      : null;
    switch (data.type) {
      case AccessType.FOLDER:
        await this.handleCreateFolder(parent);
        break;
      case AccessType.MENU:
        await this.handleCreateMenu(parent);
        break;
      case AccessType.BUTTON:
        await this.handleCreateButton(parent);
        break;
    }
    return await this.repository.save({ ...data, parent });
  }

  private async handleCreateFolder(parent: MenuEntity) {
    if (parent && [AccessType.MENU, AccessType.BUTTON].includes(parent.type)) {
      throw new HttpException(
        'MENU 和 BUTTON 不能是FOLDER的父亲',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async handleCreateMenu(parent: MenuEntity) {
    if (parent && [AccessType.BUTTON, AccessType.MENU].includes(parent.type)) {
      throw new HttpException(
        'MENU 和 BUTTON 不能是MENU的父亲',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async handleCreateButton(parent: MenuEntity) {
    if (!parent) {
      throw new HttpException('请为该权限指定父权限', HttpStatus.BAD_REQUEST);
    } else if ([AccessType.BUTTON, AccessType.FOLDER].includes(parent.type)) {
      throw new HttpException(
        'BUTTON 和 FOLDER 不能是BUTTON的父亲',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
