import { Inject, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { IUserRepository } from './interfaces/repository';
import { CreateUserInput } from './dto/users.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject(IUserRepository) private readonly usersRepository: IUserRepository,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.findAll();
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOne(id);
  }

  create(user: CreateUserInput): Promise<User> {
    return this.usersRepository.create(user);
  }

  async remove(id: number): Promise<void> {
    return this.usersRepository.remove(id);
  }
}
