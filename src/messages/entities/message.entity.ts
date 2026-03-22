import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 255 })
  text: string;
  @ManyToOne(() => User)
  @JoinColumn({ name: 'from' })
  from: User;
  @ManyToOne(() => User)
  @JoinColumn({ name: 'to' })
  to: User;
  @Column({ default: false, type: 'boolean' })
  read: boolean;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt?: Date;
}
