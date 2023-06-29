import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/sign-in.dto';
import { validate } from 'class-validator';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SignInService {
  constructor(private readonly jwtService: JwtService, private prisma: PrismaService) {}

  async generateToken(signData: SignInDto): Promise<string> {
    const user = new SignInDto();
    user.email = signData.email;
    user.password = signData.password;

    const errors = await validate(user);
    if (errors.length > 0) {
      throw new HttpException(
        { message: 'Validation failed', errors },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const emailExists = await this.emailPassordIncorrect(user.email, user.password);
    if (emailExists) {
      throw new HttpException(
        'Email already in use by another user',
        HttpStatus.CONFLICT,
      );
    }

    const payload = { email: user.email };
    const options = { expiresIn: '1h' };

    return this.jwtService.signAsync(payload, options);
  }

  async validateUser(token: string): Promise<any> {
    try {
      const payload = await this.jwtService.verifyAsync(token);
      return { email: payload.email };
    } catch (error) {
      return null;
    }
  }

  
  private async emailPassordIncorrect(email: string, password: string): Promise<boolean> {
    const existingUser = await this.prisma.client.user.findUnique({
      where: { email },
    });

    const match = existingUser.password === password;

    return !match;
  }
}
