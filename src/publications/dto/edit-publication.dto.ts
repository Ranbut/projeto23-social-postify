import { IsNotEmpty, IsString, Length, IsUrl, IsDateString } from 'class-validator';

export class EditPublicationDTO {
  @IsNotEmpty()
  @IsUrl()
  image: string

  @IsNotEmpty()
  @IsString()
  @Length(8)
  title: string

  @IsNotEmpty()
  @IsString()
  text: string;

  @IsDateString()
  dateToPublish: string;

  @IsNotEmpty()
  @IsString()
  @Length(3)
  socialMedia: string;
}