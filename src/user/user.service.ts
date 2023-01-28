import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/createUserDto';
import { OrderDtl } from '../order/orderdtl';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async all(): Promise<User[]> {
    return this.userRepository.find();
  }

  async find(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  async findWithOrder(id: number): Promise<User> {
    return this.userRepository.findOne({
      relations: { order: true },
      where: { id: id },
    });
  }

  async create(data: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(data);

    return this.userRepository.save(user);
  }
}
