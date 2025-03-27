import { BasicEntity } from '@/modules/Database/base';
import { Column, Entity } from 'typeorm';
import { OnlineStatus } from '@/modules/Mall/constants';

export interface Spec {
  key: string;
  value: string;
  key_id: number;
  value_id: number;
}

@Entity('sku')
export class SkuEntity extends BasicEntity {
  @Column({
    comment: 'SPU id',
    nullable: false,
    type: 'varchar',
    length: 64,
  })
  spu_id: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    unique: true,
  })
  title: string;

  @Column({
    comment: '价格',
    type: 'varchar',
    length: 20,
    nullable: false,
  })
  price: string;

  @Column({
    comment: '价格',
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  discount_price: string;

  @Column({
    comment: '是否上线',
    type: 'enum',
    enum: OnlineStatus,
    default: OnlineStatus.ONLINE,
  })
  online: OnlineStatus;

  @Column({
    comment: '图片',
    nullable: true,
  })
  img: string;

  @Column({
    comment:
      '编码 格式: spu_id$spec_key_id-spec_value_id#spec_key_id-spec_value_id',
    nullable: false,
  })
  code: string;

  @Column({
    comment: '分类',
    nullable: false,
  })
  category_id: string;

  @Column({
    comment: '库存',
    type: 'int',
  })
  stock: number;

  @Column({
    comment: 'spec',
    type: 'json',
  })
  specs: Array<Spec>;
}
