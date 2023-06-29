import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SignInService } from './sign-in.service';
import { JwtStrategy } from './jwt.strategy';
import { PrismaService } from 'src/prisma.service';
import { SignInController } from './sign-in.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: '4d8f41babd23e83e17741a4a1c9bb8eb',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [SignInController],
  providers: [SignInService, JwtStrategy, PrismaService],
  exports: [SignInService],
})
export class SignInModule {}
