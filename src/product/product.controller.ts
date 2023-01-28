import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product';
import { CreateProductDto } from './dtos/createProductDto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async all(): Promise<Product[]> {
    return await this.productService.all();
  }

  @Post()
  async create(@Body() data: CreateProductDto): Promise<Product> {
    return await this.productService.create(data);
  }
}
