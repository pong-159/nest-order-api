import { Injectable } from '@nestjs/common';
import { Order } from './order';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/user/dtos/createUserDto';
import { User } from 'src/user/user';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dtos/createOrderDto';
import { OrderDtl } from './orderdtl';
import { Product } from '../product/product';
import { UserService } from '../user/user.service';
import { ProductService } from '../product/product.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderDtl)
    private readonly orderDtlRepository: Repository<OrderDtl>,

    private readonly productService: ProductService,
    protected readonly userService: UserService,
  ) {}

  async all(): Promise<Order[]> {
    return this.orderRepository.find();
  }

  async find(id: number): Promise<Order> {
    return this.orderRepository.findOne({
      relations: { orderDtl: true },
      where: { id: id },
    });
  }

  async findOrderWithDetails(id: number): Promise<Order> {
    return this.orderRepository
      .createQueryBuilder()
      .select('order')
      .from(Order, 'order')
      .where('order.id = :id', { id })
      .leftJoinAndSelect('order.orderDtl', 'orderDtl')
      .leftJoinAndSelect('orderDtl.product', 'product')
      .getOne();
  }

  async create(data: CreateOrderDto): Promise<Order> {
    const user = await this.userService.find(data.userId);

    const order = this.orderRepository.create(data);
    order.users = user;
    order.orderDtl = await this.mockDtls();

    return this.orderRepository.save(order);
  }

  async mockDtls(round: number = 5): Promise<OrderDtl[]> {
    const orderDtls: OrderDtl[] = new Array();
    for (let i = 0; i < round; i++) {
      orderDtls.push(await this.mockDtl());
    }

    return orderDtls;
  }

  async mockDtl(): Promise<OrderDtl> {
    const orderdtl = this.orderDtlRepository.create();
    orderdtl.quantity = Math.round(Math.random() * 10000000);
    orderdtl.product = await this.mockProduct();

    return orderdtl;
  }

  async mockProduct(): Promise<Product> {
    const product = await this.productService.createNew();
    product.name = 'n' + Math.random() * 10000000 + 'tys';
    product.price = Math.round(Math.random() * 1000000);
    product.description =
      'description' + Math.random() * 5000 + (Math.random() * 1000 + 'gg ez');
    return product;
  }
}
