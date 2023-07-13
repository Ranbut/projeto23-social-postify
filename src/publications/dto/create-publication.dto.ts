import { IsNotEmpty, IsString, Length, IsUrl, IsBoolean, IsDateString } from 'class-validator';

export class CreatePublicationDTO {

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

  @IsBoolean()
  published: boolean

  @IsNotEmpty()
  @IsString()
  @Length(3)
  socialMedia: string;
}
