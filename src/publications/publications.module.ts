import { Module } from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { PublicationsController } from './publications.controller';
import { PublicationsRepository } from './repository/publication.repository';
import { PrismaPublicationsRepository } from './repository/implementations/prismaPublications.repository';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [PublicationsController],
  providers: [
    PublicationsService,
    {
      provide: PublicationsRepository,
      useClass: PrismaPublicationsRepository,
    },
  ]
})
export class PublicationsModule {}
