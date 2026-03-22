import { IsEmail } from 'class-validator';
import { Message } from 'src/messages/entities/message.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
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
  @OneToMany(() => Message, message => message.from)
  receivedMessages: Message[];
  @OneToMany(() => Message, message => message.to)
  sentMessages: Message[];
}
