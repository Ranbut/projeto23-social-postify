import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UsersModule } from './users/users.module';
import { SignInModule } from './sign-in/sign-in.module';

@Module({
  imports: [UsersModule, SignInModule],
  providers: [PrismaService],
})
export class AppModule {}