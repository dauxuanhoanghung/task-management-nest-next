import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('email_templates')
export class EmailTemplateSchema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 100 })
  @Index()
  templateCode: string;

  @Column({ length: 255 })
  subject: string;

  @Column('text')
  templateText: string;

  @Column('text', { nullable: true })
  style: string | null;

  @Column({ length: 100 })
  originalTemplateCode: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
