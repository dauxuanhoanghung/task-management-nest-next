import { Injectable, NotFoundException } from '@nestjs/common';
import { Account } from './account.entity';
import { IAccountRepository } from './interfaces/repository';
import { Inject } from '@nestjs/common';
import { CreateAccountInput, UpdateAccountInput } from './dto/account.dto';

@Injectable()
export class AccountService {
  constructor(
    @Inject('IAccountRepository')
    private readonly accountRepository: IAccountRepository,
  ) {}

  // 1. CRUD
  async findAll(): Promise<Account[]> {
    return this.accountRepository.findAll();
  }

  async findById(id: number): Promise<Account> {
    const account = await this.accountRepository.findById(id);
    if (!account) {
      throw new NotFoundException(`Account with id ${id} not found`);
    }
    return account;
  }

  async findByEmail(email: string): Promise<Account> {
    const account = await this.accountRepository.findByEmail(email);
    if (!account) {
      throw new NotFoundException(`Account with email ${email} not found`);
    }
    return account;
  }

  async createAccount(account: CreateAccountInput): Promise<Account> {
    return this.accountRepository.createAccount(account);
  }

  async updateAccount(
    id: number,
    update: UpdateAccountInput,
  ): Promise<Account> {
    const updated = await this.accountRepository.updateAccount(id, update);
    if (!updated) {
      throw new NotFoundException(`Account with id ${id} not found`);
    }
    return updated;
  }

  async deleteAccount(id: number): Promise<void> {
    const deleted = await this.accountRepository.deleteAccount(id);
    if (!deleted) {
      throw new NotFoundException(`Account with id ${id} not found`);
    }
  }

  // 2. Status
  async findActive(): Promise<Account[]> {
    return this.accountRepository.findActive();
  }

  // 3. Authentication
  async checkEmailExists(email: string): Promise<boolean> {
    return this.accountRepository.checkEmailExists(email);
  }

  async validateLogin(email: string, password: string): Promise<Account> {
    const account = await this.accountRepository.validateLogin(email, password);
    if (!account) {
      throw new NotFoundException('Email or password is incorrect');
    }
    return account;
  }
}
