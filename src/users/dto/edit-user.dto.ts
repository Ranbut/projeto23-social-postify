import { IsNotEmpty, IsString, Length, IsUrl } from 'class-validator';

export class EditUserDTO {
  @IsNotEmpty()
  @IsString()
  @Length(3)
  name: string;

  @IsNotEmpty()
  @IsUrl()
  avatar: string;
}
