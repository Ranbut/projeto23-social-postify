import { Prisma, Publication } from '@prisma/client';

export abstract class PublicationsRepository {
  abstract postPublication(data: Prisma.PublicationUncheckedCreateInput): Promise<Publication>;
  abstract getUserPublications(userId: number): Promise<Publication[]>;
  abstract getUserPublication(userId: number, publicationId: number): Promise<Publication>;
  abstract updatePublication(data: Prisma.PublicationUpdateInput, publicationId: number): Promise<Publication>;
  abstract deletePublication(publicationId: number);
}
