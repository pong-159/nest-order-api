import { Injectable } from '@nestjs/common';
import { Product } from './product';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dtos/createProductDto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async all(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async find(id: number): Promise<Product> {
    return this.productRepository.findOneBy({ id });
  }

  async create(data: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(data);

    return this.productRepository.save(product);
  }

  async createNew(): Promise<Product> {
    return this.productRepository.create();
  }
}
