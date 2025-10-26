import { Account } from '../account.entity';
export const IAccountRepository = 'IAccountRepository';

export interface IAccountRepository {
  findByEmail(email: string): Promise<Account | null>;
  createAccount(account: Partial<Account>): Promise<Account>;
  updateAccount(id: number, update: Partial<Account>): Promise<Account | null>;
}
