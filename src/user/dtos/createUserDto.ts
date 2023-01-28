import { Order } from 'src/order/order';

export class CreateUserDto {
  name: string;

  age: number;

  email: string;

  orders: Order[];
}
