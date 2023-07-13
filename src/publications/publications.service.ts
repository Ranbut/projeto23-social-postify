import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePublicationDTO } from './dto/create-publication.dto';
import { PublicationsRepository } from './repository/publication.repository';
import { EditPublicationDTO } from './dto/edit-publication.dto';

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

    async updatePublication(publicationDTO: EditPublicationDTO, userId: number, publicationId: number) {
      await this.getUserPostExist(userId, publicationId);

      return await this.publicationsRepository.updatePublication({
        userId,
        image: publicationDTO.image,
        title: publicationDTO.title,
        text: publicationDTO.text,
        dateToPublish: new Date(publicationDTO.dateToPublish),
        socialMedia: publicationDTO.socialMedia,
        }, publicationId);
    }

    async deletePublication(userId: number, publicationId: number) {
      await this.getUserPostExist(userId, publicationId);

      return await this.publicationsRepository.deletePublication(publicationId);
    }

    async getUserPostExist(userId: number, publicationId: number){
      const publication = await this.publicationsRepository.getUserPublication(userId, publicationId);

      if(!publication)
        throw new HttpException('Publication by user does not exist', HttpStatus.NOT_FOUND);
    }
}
