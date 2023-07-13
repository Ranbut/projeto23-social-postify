import {
  Body,
  Controller,
  Delete,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { AuthGuard } from 'src/auth/authGuard/auth.guard';
import { EditUserDTO } from './dto/edit-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  addUser(@Body() body: CreateUserDTO) {
    return this.usersService.addUser(body);
  }

  @UseGuards(AuthGuard)
  @Put()
  editUser(@Body() body: EditUserDTO, @Request() req: any) {
    return this.usersService.editUser(body, Number(req.user.id));
  }

  @UseGuards(AuthGuard)
  @Delete()
  deleteUser(@Request() req: any) {
    return this.usersService.deleteUser(Number(req.user.id));
  }
}