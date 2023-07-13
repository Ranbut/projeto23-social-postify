import {
  Body,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { AuthGuard } from 'src/auth/authGuard/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
  @Post()
  addUser(@Body() body: CreateUserDTO) {
    return this.usersService.addUser(body);
  }
}