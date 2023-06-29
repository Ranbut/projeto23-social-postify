import { Controller, Post, Body } from '@nestjs/common';
import { SignInService } from './sign-in.service';
import { SignInDto } from './dto/sign-in.dto';

@Controller('sign-in')
export class SignInController {
  constructor(private readonly authService: SignInService) {}

  @Post()
  async signIn(@Body() body: SignInDto) {
    const token = await this.authService.generateToken(body);
    return token;
  }
}
