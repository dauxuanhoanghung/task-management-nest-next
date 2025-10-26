import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { registerEnumType } from '@nestjs/graphql';

export enum AccountStatus {
  INACTIVE = 0,
  ACTIVE = 1,
  SUSPENDED = 2,
}

registerEnumType(AccountStatus, {
  name: 'AccountStatus',
  description: 'Account status enum',
});

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: AccountStatus,
    default: AccountStatus.ACTIVE,
  })
  status: AccountStatus;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
