import { Injectable } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
import { User } from './entity/User';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  users: User[] = [];

  constructor(private prisma: PrismaService) { }

  async add({ name, email, password, avatar }: User) {
    const user = new User(name, email, password, avatar);
    user.name = name;
    user.email = email;
    user.password = password;
    user.avatar = avatar;

    const emailExists = await this.emailExists(email);
    if (emailExists)
      throw new HttpException('Email already in use by other user', HttpStatus.CONFLICT);

    return this.prisma.client.user.create({
      data: { name, email, password, avatar }
    });
  }

  private async emailExists(email: string): Promise<boolean> {
    const existingUser = await this.prisma.client.user.findUnique({
      where: { email },
    });
    return !!existingUser;
  }
}