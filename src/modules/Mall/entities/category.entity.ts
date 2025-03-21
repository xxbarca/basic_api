import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CategoryStatus } from '@/modules/Mall/constants';

@Entity('category')
export class CategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    default: 1,
  })
  level: number;

  @Column({
    comment: '是否上线',
    type: 'enum',
    enum: CategoryStatus,
    default: 0,
  })
  online: CategoryStatus;

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

  @DeleteDateColumn()
  delete_time: Date;

  @UpdateDateColumn()
  update_time: Date;

  @CreateDateColumn()
  create_time: Date;
}
