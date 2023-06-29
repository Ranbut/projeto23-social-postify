import { HttpException, HttpStatus } from '@nestjs/common';

export class User {
  constructor(
    private _name: string,
    private _email: string,
    private _password: string,
    private _avatar: string,
  ) {}

  set name(name: string) {
    if (name.length < 3 || !name)
      throw new HttpException('Invalid Name', HttpStatus.UNPROCESSABLE_ENTITY);
    this._name = name;
  }

  get name() {
    return this._name;
  }

  set email(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email))
        throw new HttpException('Invalid Email', HttpStatus.UNPROCESSABLE_ENTITY);
    this._email = email;
  }

  get email() {
    return this._email;
  }

  set password(password: string) {
    if (password.length < 6 || password.length > 20 || !password)
        throw new HttpException('Invalid Password', HttpStatus.UNPROCESSABLE_ENTITY);
    this._password = password;
  }

  get password() {
    return this._password;
  }

  set avatar(avatar: string) {
    if (!avatar)
        throw new HttpException('Invalid Avatar URL', HttpStatus.UNPROCESSABLE_ENTITY);
    try {
      new URL(avatar);
    } catch (error) {
      throw new HttpException('Invalid Avatar URL', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    this._avatar = avatar;
  }

  get avatar() {
    return this._avatar;
  }
}