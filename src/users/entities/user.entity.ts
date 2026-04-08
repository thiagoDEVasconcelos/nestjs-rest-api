import { IsEmail } from 'class-validator';
import { Messages } from 'src/messages/entities/message.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 255 })
  name: string;
  @Column({ type: 'varchar', length: 255, unique: true })
  @IsEmail()
  email: string;
  @Column()
  password: string;
  @CreateDateColumn()
  createdAt?: Date;
  @CreateDateColumn()
  updatedAt?: Date;
  @OneToMany(() => Messages, message => message.from)
  sentMessages: Messages[];
  @OneToMany(() => Messages, message => message.to)
  receivedMessages: Messages[];
  @Column({ default: true })
  isActive: boolean;
  @Column({ default: '' })
  photo: string;
}
