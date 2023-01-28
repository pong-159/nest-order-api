import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './order';
import { Product } from 'src/product/product';

@Entity()
export class OrderDtl {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, (order) => order.orderDtl)
  orders: Order;

  @ManyToOne(() => Product, (product) => product.orderDtl, {
    cascade: true,
  })
  product: Product;

  @Column()
  quantity: number;

  @CreateDateColumn()
  timestampt: Date;
}
