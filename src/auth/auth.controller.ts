import {
  Body,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common';
import { AuthSigninDTO } from './dto/auth-signin.dto';
import { AuthService } from './auth.service';

@Controller('signin')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post()
  async signin(@Body() body: AuthSigninDTO) {
    return this.authService.signin(body);
  }
}
