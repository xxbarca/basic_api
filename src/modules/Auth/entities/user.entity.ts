import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';

@Entity({ name: 'user' })
@Exclude()
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  id: string;

  @Column({
    comment: '用户名',
    nullable: false,
    unique: true,
  })
  @Expose()
  username: string;

  @Column({
    comment: '密码',
    nullable: false,
  })
  password: string;

  @Column({
    comment: '昵称',
  })
  @Expose()
  nickname: string;

  @Column({
    comment: '邮箱',
    nullable: true,
  })
  @Expose()
  email: string;

  @Column({
    comment: '手机',
    nullable: true,
  })
  @Expose()
  phone: string;

  @Column({
    comment: '头像',
    nullable: true,
  })
  @Expose()
  avatar: string;

  @Column({
    comment: '描述',
    nullable: true,
  })
  @Expose()
  description: string;

  @CreateDateColumn({
    comment: '创建时间',
  })
  @Expose()
  created_at: Date;

  @UpdateDateColumn({
    comment: '更新时间',
  })
  @Expose()
  updated_at: Date;

  @Column({ nullable: true })
  accessToken: string;

  @Column({ nullable: true })
  refreshToken: string;
}
