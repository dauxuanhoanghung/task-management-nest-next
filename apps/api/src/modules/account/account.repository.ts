import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Account, AccountStatus } from './account.entity';
import { IAccountRepository } from './interfaces/repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AccountRepository implements IAccountRepository {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) { }

  async findByEmail(email: string): Promise<Account | null> {
    return this.accountRepository.findOne({ where: { email } });
  }

  async createAccount(account: Partial<Account>): Promise<Account> {
    const newAccount = this.accountRepository.create({
      ...account,
      status: AccountStatus.ACTIVE,
    });
    return this.accountRepository.save(newAccount);
  }

  async updateAccount(
    id: number,
    update: Partial<Account>,
  ): Promise<Account | null> {
    const account = await this.accountRepository.findOne({ where: { id } });
    if (!account) {
      return null;
    }

    await this.accountRepository.update({ id }, update);
    return this.accountRepository.findOne({ where: { id } });
  }
}
