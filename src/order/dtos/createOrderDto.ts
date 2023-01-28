import { Order } from 'src/order/order';
import { OrderDtl } from '../orderdtl';
import { User } from 'src/user/user';

export class CreateOrderDto {
  userId: number;

  orderDtl: OrderDtl[];
}
