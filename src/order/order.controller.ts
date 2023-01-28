import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { CreateOrderDto } from './dtos/createOrderDto';
import { Order } from './order';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async all(): Promise<Order[]> {
    return await this.orderService.all();
  }

  @Get('/:id')
  async find(@Param('id') id: number): Promise<Order> {
    return await this.orderService.find(id);
  }

  @Get('/:id/detail')
  async findWithDetail(@Param('id') id: number): Promise<Order> {
    return await this.orderService.findOrderWithDetails(id);
  }

  @Post()
  async create(@Body() data: CreateOrderDto): Promise<Order> {
    return await this.orderService.create(data);
  }
}
