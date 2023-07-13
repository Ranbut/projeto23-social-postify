import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from './repository/user.repository';
import { EditUserDTO } from './dto/edit-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async addUser(data: CreateUserDTO) {
    const hashPassword = bcrypt.hashSync(data.password, 10);
    const user = await this.usersRepository.findUserByEmail(data.email);
    if (user)
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    return await this.usersRepository.addUser({
      ...data,
      password: hashPassword,
    });
  }

  async editUser(data: EditUserDTO, id: number) {
    await this.findUserById(id);

    return await this.usersRepository.editUser(data, id);
  }

  async deleteUser(id: number) {
    await this.findUserById(id);
    
    return await this.usersRepository.deleteUser(id);
  }
  
  async findUserById(id: number) {
    const user = await this.usersRepository.findUserById(id);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return user;
  }
}