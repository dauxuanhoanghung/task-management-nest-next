import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Inject } from '@nestjs/common';
import { Account } from './account.entity';
import { IAccountRepository } from './interfaces/repository';
import { RegisterInput, ChangePasswordInput, LoginInput } from './dto/account.dto';

@Injectable()
export class AccountService {
  constructor(
    @Inject('IAccountRepository')
    private readonly accountRepository: IAccountRepository,
  ) { }

  // REGISTER
  async register(input: RegisterInput): Promise<Account> {
    const existingAccount = await this.accountRepository.findByEmail(input.email);
    if (existingAccount) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await this.hashPassword(input.password);

    const newAccount = await this.accountRepository.createAccount({
      email: input.email,
      password: hashedPassword,
    });

    return newAccount;
  }

  // LOGIN
  async validateLogin(input: LoginInput): Promise<Account> {
    const account = await this.accountRepository.findByEmail(input.email);
    if (!account) {
      throw new NotFoundException('Email or password is incorrect');
    }

    const isPasswordValid = await bcrypt.compare(input.password, account.password);
    if (!isPasswordValid) {
      throw new NotFoundException('Email or password is incorrect');
    }

    return account;
  }

  // CHANGE PASSWORD
  async changePassword(input: ChangePasswordInput): Promise<Account> {
    const account = await this.accountRepository.findByEmail(input.email);
    if (!account) {
      throw new NotFoundException('Account not found');
    }

    const isOldPasswordValid = await bcrypt.compare(input.oldPassword, account.password);
    if (!isOldPasswordValid) {
      throw new BadRequestException('Old password is incorrect');
    }

    const hashedNewPassword = await this.hashPassword(input.newPassword);

    const updatedAccount = await this.accountRepository.updateAccount(account.id, {
      password: hashedNewPassword,
    });

    if (!updatedAccount) {
      throw new NotFoundException('Failed to update password');
    }

    return updatedAccount;
  }

  // PRIVATE: HASH
  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }
}
