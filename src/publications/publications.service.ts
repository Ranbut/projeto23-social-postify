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
        ...publicationDTO,
        dateToPublish: new Date(publicationDTO.dateToPublish)
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
        ...publicationDTO,
        dateToPublish: new Date(publicationDTO.dateToPublish)
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
