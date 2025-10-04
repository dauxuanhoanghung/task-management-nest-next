import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Account, AccountStatus } from './account.entity';
import { IAccountRepository } from './interfaces/repository';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AccountRepository implements IAccountRepository {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {}

  // 1. CRUD
  async findAll(): Promise<Account[]> {
    return this.accountRepository.find();
  }

  async findById(id: number): Promise<Account | null> {
    return this.accountRepository.findOne({ where: { id } });
  }

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

  async deleteAccount(id: number): Promise<boolean> {
    const result = await this.accountRepository.delete({ id });
    return (result.affected ?? 0) > 0;
  }

  // 2. Check status
  async findActive(): Promise<Account[]> {
    return this.accountRepository.find({
      where: { status: AccountStatus.ACTIVE },
    });
  }

  // 3. Authentication
  async checkEmailExists(email: string): Promise<boolean> {
    const count = await this.accountRepository.count({ where: { email } });
    return count > 0;
  }

  async validateLogin(
    email: string,
    password: string,
  ): Promise<Account | null> {
    const account = await this.findByEmail(email);
    if (!account) return null;

    const isValid = await bcrypt.compare(password, account.password);
    return isValid ? account : null;
  }
}
