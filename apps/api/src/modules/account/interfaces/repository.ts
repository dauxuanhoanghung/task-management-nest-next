import { Account, AccountStatus } from "../account.entitty";
import { CreateAccountInput, UpdateAccountInput } from "../dto/account.dto";

export const IAccountRepository = 'IAccountRepository';

export interface IAccountRepository {
  // 1. CRUD
  findAll(): Promise<Account[]>;
  findById(id: number): Promise<Account | null>;
  findByEmail(email: string): Promise<Account | null>;
  createAccount(account: CreateAccountInput): Promise<Account>;
  updateAccount(id: number, update: UpdateAccountInput): Promise<Account | null>;
  deleteAccount(id: number): Promise<boolean>;

  // 2. Check status
  findActive(): Promise<Account[]>;

  // 3. Authentication
  checkEmailExists(email: string): Promise<boolean>;
  validateLogin(email: string, password: string): Promise<Account | null>;
}
