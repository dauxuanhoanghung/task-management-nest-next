import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountService } from './account.service';
import { AccountResolver } from './account.resolver';
import { IAccountRepository } from './interfaces/repository';
import { AccountRepository } from './account.repository';
import { Account } from './account.entitty';

@Module({
  imports: [TypeOrmModule.forFeature([Account])],
  providers: [
    AccountService,
    AccountResolver,
    {
      provide: IAccountRepository,
      useClass: AccountRepository,
    },
  ],
})
export class AccountModule { }
