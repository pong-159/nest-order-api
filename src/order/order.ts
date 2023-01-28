import { User } from 'src/user/user';
import { OrderDtl } from './orderdtl';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.order)
  users: User;

  @CreateDateColumn()
  timestampt: Date;

  @OneToMany(() => OrderDtl, (orderDtl) => orderDtl.orders, {
    cascade: true,
  })
  orderDtl: OrderDtl[];
}
