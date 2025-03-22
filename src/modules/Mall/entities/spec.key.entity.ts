import { Column, Entity } from 'typeorm';
import { BasicEntity } from '@/modules/Database/base';

@Entity('spec_key')
export class SpecKeyEntity extends BasicEntity {
  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
    unique: true,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 30,
    nullable: true,
  })
  unit: string;
}
