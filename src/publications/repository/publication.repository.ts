import { Prisma, Publication } from '@prisma/client';

export abstract class PublicationsRepository {
  abstract postPublication(data: Prisma.PublicationUncheckedCreateInput): Promise<Publication>;
  abstract getUserPublications(userId: number): Promise<Publication[]>;
}
