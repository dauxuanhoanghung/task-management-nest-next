import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AccountService } from './account.service';
import { AccountModel } from './models/account.model';
import { ChangePasswordInput, LoginInput, RegisterInput } from './dto/account.dto';

@Resolver(() => AccountModel)
export class AccountResolver {
  constructor(private readonly accountService: AccountService) { }

  // LOGIN
  @Mutation(() => AccountModel)
  async login(@Args('input') input: LoginInput): Promise<AccountModel> {
    return this.accountService.validateLogin(input);
  }

  // REGISTER
  @Mutation(() => AccountModel)
  async register(@Args('input') input: RegisterInput): Promise<AccountModel> {
    return this.accountService.register(input);
  }

  // CHANGE PASSWORD
  @Mutation(() => AccountModel)
  async changePassword(
    @Args('input') input: ChangePasswordInput,
  ): Promise<AccountModel> {
    return this.accountService.changePassword(input);
  }
}
