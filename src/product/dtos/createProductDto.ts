import { Order } from 'src/order/order';
import { OrderDtl } from '../../order/orderdtl';

export class CreateProductDto {
  name: string;

  price: number;

  description: string;

  orderDtl: OrderDtl[];
}
