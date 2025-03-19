import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'banner' })
export class BannerEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  img: string;

  @Column()
  title: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @DeleteDateColumn()
  delete_time: Date;

  @UpdateDateColumn()
  update_time: Date;

  @CreateDateColumn()
  create_time: Date;
}
