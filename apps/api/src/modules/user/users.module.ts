import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { IUserRepository } from './interfaces/repository';
import { UsersResolver } from './users.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UsersService,
    UsersResolver,
    {
      provide: IUserRepository,
      useClass: UsersRepository,
    },
  ],
})
export class UserModule {}
