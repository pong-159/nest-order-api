import { OrderDtl } from 'src/order/orderdtl';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  description: string;

  @OneToMany(() => OrderDtl, (orderDtl) => orderDtl.product, {
    nullable: true,
  })
  orderDtl: OrderDtl[];
}
