import { Body, Controller, Get, Post, Req, Request, UseGuards } from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { AuthGuard } from '../auth/authGuard/auth.guard';
import { CreatePublicationDTO } from './dto/create-publication.dto';

@Controller('publications')
export class PublicationsController {
  constructor(private readonly publicationsService: PublicationsService) {}

  @UseGuards(AuthGuard)
  @Post()
  async postPublication(@Body() body: CreatePublicationDTO, @Request() req: any) {
    return this.publicationsService.postPublication(body, Number(req.user.id));
  }

  @UseGuards(AuthGuard)
  @Get()
  async getUserPublications(@Request() req: any) {
    return this.publicationsService.getUserPublications(Number(req.user.id));
  }

}