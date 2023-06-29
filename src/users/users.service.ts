import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/addUser.dto';
import { validate } from 'class-validator';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async add(userData: CreateUserDto) {
    const user = new CreateUserDto();
    user.name = userData.name;
    user.email = userData.email;
    user.password = userData.password;
    user.avatar = userData.avatar;

    const errors = await validate(user);
    if (errors.length > 0) {
      throw new HttpException(
        { message: 'Validation failed', errors },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const emailExists = await this.emailExists(user.email);
    if (emailExists) {
      throw new HttpException(
        'Email already in use by another user',
        HttpStatus.CONFLICT,
      );
    }

    return this.prisma.client.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
        avatar: user.avatar,
      },
    });
  }

  private async emailExists(email: string): Promise<boolean> {
    const existingUser = await this.prisma.client.user.findUnique({
      where: { email },
    });
    return !!existingUser;
  }
}