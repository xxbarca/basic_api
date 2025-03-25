import { Column, Entity } from 'typeorm';
import { OnlineStatus } from '@/modules/Mall/constants';
import { BasicEntity } from '@/modules/Database/base';

@Entity('category')
export class CategoryEntity extends BasicEntity {
  @Column({
    default: 1,
  })
  level: number;

  @Column({
    comment: '是否上线',
    type: 'enum',
    enum: OnlineStatus,
    default: OnlineStatus.ONLINE,
  })
  online: OnlineStatus;

  @Column({
    comment: '排序',
    default: 0,
  })
  index: number;

  @Column({
    comment: '图片',
    nullable: true,
  })
  img: string;

  @Column({
    comment: '名称',
    unique: true,
  })
  name: string;

  @Column({
    comment: '描述',
    type: 'text',
    nullable: true,
  })
  description: string;

  @Column({
    comment: '父分类id',
    nullable: true,
  })
  parent_id: string;

  parent: CategoryEntity | null;
}
