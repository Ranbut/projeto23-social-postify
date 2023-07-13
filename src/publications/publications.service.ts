import { Injectable } from '@nestjs/common';
import { CreatePublicationDTO } from './dto/create-publication.dto';
import { PublicationsRepository } from './repository/publication.repository';

@Injectable()
export class PublicationsService {
    constructor(private readonly publicationsRepository: PublicationsRepository) {}

    async postPublication(publicationDTO: CreatePublicationDTO, userId: number) {
      const publication = await this.publicationsRepository.postPublication({
        userId,
        image: publicationDTO.image,
        title: publicationDTO.title,
        text: publicationDTO.text,
        dateToPublish: new Date(publicationDTO.dateToPublish),
        published: publicationDTO.published,
        socialMedia: publicationDTO.socialMedia,
        }
        );
      return publication;
    }

    async getUserPublications(userId: number) {
      return await this.publicationsRepository.getUserPublications(userId);
    }
}
