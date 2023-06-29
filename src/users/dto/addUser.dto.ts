import { IsEmail, IsNotEmpty, IsString, Length, IsUrl } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(3)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(6, 20)
  password: string;

  @IsNotEmpty()
  @IsUrl()
  avatar: string;
}
