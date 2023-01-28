import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user';
import { CreateUserDto } from './dtos/createUserDto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async all(): Promise<User[]> {
    return await this.userService.all();
  }

  @Get('/:id')
  async allWithOrder(@Param('id') id: number): Promise<User> {
    return await this.userService.findWithOrder(id);
  }

  @Post()
  async create(@Body() data: CreateUserDto): Promise<User> {
    return await this.userService.create(data);
  }
}
