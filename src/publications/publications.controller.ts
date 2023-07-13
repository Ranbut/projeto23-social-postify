import { Body, Controller, Delete, Get, Param, Post, Put, Req, Request, UseGuards } from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { AuthGuard } from '../auth/authGuard/auth.guard';
import { CreatePublicationDTO } from './dto/create-publication.dto';
import { EditPublicationDTO } from './dto/edit-publication.dto';

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

  @UseGuards(AuthGuard)
  @Put(':id')
  async getUserPuupdatePublicationblications(
    @Body() body: EditPublicationDTO, 
    @Request() req: any, 
    @Param() params: any
    ) {
    return this.publicationsService.updatePublication(body, Number(req.user.id), Number(params.id));
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deletePublication(@Request() req: any, @Param() params: any) {
    return this.publicationsService.deletePublication(Number(req.user.id), Number(params.id));
  }
}