import { IsEmail } from 'class-validator';
import { Order } from 'src/order/order';
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

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  @IsEmail()
  email: string;

  @CreateDateColumn()
  timestampt: Date;

  @OneToMany(() => Order, (order) => order.users, { nullable: true })
  order?: Order[];
}
