import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entity/User';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  addUser(@Body() body: User) {
    return this.usersService.add(body);
  }
}