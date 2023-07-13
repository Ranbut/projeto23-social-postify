import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from '../../dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersRepository } from '../user.repository';
import { EditUserDTO } from 'src/users/dto/edit-user.dto';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async addUser(data: CreateUserDTO) {
    return await this.prisma.user.create({ data: data });
  }

  async findAllUsers() {
    return await this.prisma.user.findMany({});
  }

  async findUserByEmail(email: string) {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async findUserById(id: number) {
    return await this.prisma.user.findFirst({ where: { id } });
  }

  async editUser(data: EditUserDTO, id: number) {
    return await this.prisma.user.update({ where: { id }, data: data });
  }

  async deleteUser(id: number) {
    return await this.prisma.$transaction([
      this.prisma.publication.deleteMany({ where: { userId: id } }),
      this.prisma.user.delete( { where: { id } })
    ]);
  }
}
