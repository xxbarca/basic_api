import { Column, Entity } from 'typeorm';
import { BasicEntity } from '@/modules/Database/base';

@Entity('spec_value')
export class SpecValueEntity extends BasicEntity {
  @Column({
    comment: '规格值',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  value: string;

  @Column({
    comment: '规格名ID',
    nullable: false,
  })
  spec_key_id: string;
}
