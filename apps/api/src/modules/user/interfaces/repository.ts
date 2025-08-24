import { CreateUserInput } from '../dto/users.dto';
import { User } from '../user.entity';

export const IUserRepository = 'IUserRepository';

export interface IUserRepository {
  findAll(): Promise<User[]>;
  findOne(id: number): Promise<User | null>;
  create(user: CreateUserInput): Promise<User>;
  remove(id: number): Promise<void>;
}
