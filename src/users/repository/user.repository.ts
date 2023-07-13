import { User } from '@prisma/client';
import { CreateUserDTO } from '../dto/create-user.dto';
import { EditUserDTO } from '../dto/edit-user.dto';

export abstract class UsersRepository {
  abstract addUser(data: CreateUserDTO): Promise<User>;
  abstract findAllUsers(): Promise<User[]>;
  abstract findUserByEmail(email: string): Promise<User>;
  abstract findUserById(id: number): Promise<User>;
  abstract editUser(data: EditUserDTO, id: number): Promise<User>;
  abstract deleteUser(id: number);
}
