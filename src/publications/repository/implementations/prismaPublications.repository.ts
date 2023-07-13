import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PublicationsRepository } from '../publication.repository';
import { Prisma } from '@prisma/client';

@Injectable()
export class PrismaPublicationsRepository implements PublicationsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async postPublication(data: Prisma.PublicationUncheckedCreateInput) {
    return await this.prisma.publication.create({ data });
  }

  async getUserPublications(userId: number) {
    return await this.prisma.publication.findMany({ where: { userId } });
  }

  async getUserPublication(userId: number, publicationId: number) {
    return await this.prisma.publication.findFirst({ where: { id: publicationId ,userId } });
  }

  async updatePublication(data: Prisma.PublicationUpdateInput, publicationId: number) {
    return await this.prisma.publication.update({ 
      where: { id: publicationId },
      data
    });
  }

  async deletePublication(publicationId: number) {
    return await this.prisma.publication.delete({ where: { id: publicationId } });
  }
}
