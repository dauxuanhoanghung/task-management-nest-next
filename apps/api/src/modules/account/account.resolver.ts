import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AccountService } from './account.service';
import { CreateAccountInput, UpdateAccountInput } from './dto/account.dto';
import { AccountModel } from './models/account.model';

@Resolver(() => AccountModel)
export class AccountResolver {
  constructor(private readonly accountService: AccountService) {}

  // Queries
  @Query(() => [AccountModel], { name: 'findAllAccounts' })
  async findAll(): Promise<AccountModel[]> {
    return this.accountService.findAll();
  }

  @Query(() => AccountModel, { name: 'findByIdAccount' })
  async findById(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<AccountModel> {
    return this.accountService.findById(id);
  }

  @Query(() => AccountModel, { name: 'findByEmailAccount' })
  async findByEmail(
    @Args('email', { type: () => String }) email: string,
  ): Promise<AccountModel> {
    return this.accountService.findByEmail(email);
  }

  @Query(() => [AccountModel], { name: 'findActiceAccount' })
  async findActive(): Promise<AccountModel[]> {
    return this.accountService.findActive();
  }

  // Mutations
  @Mutation(() => AccountModel, { name: 'createAccount' })
  async create(
    @Args('input') input: CreateAccountInput,
  ): Promise<AccountModel> {
    return this.accountService.createAccount(input);
  }

  @Mutation(() => AccountModel, { name: 'updateAccount' })
  async update(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateAccountInput,
  ): Promise<AccountModel> {
    return this.accountService.updateAccount(id, input);
  }

  @Mutation(() => Boolean, { name: 'deleteAccount' })
  async delete(@Args('id', { type: () => Int }) id: number): Promise<boolean> {
    await this.accountService.deleteAccount(id);
    return true;
  }

  @Mutation(() => AccountModel, { name: 'login' })
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<AccountModel> {
    return this.accountService.validateLogin(email, password);
  }
}
