import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
  Int,
} from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UserModel } from './models/users.model';
import { CreateUserInput } from './dto/users.dto';

@Resolver(() => UserModel)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [UserModel])
  async getUsers(): Promise<UserModel[]> {
    return this.usersService.findAll();
  }

  @Query(() => UserModel, { nullable: true })
  async getUser(@Args('id') id: number): Promise<UserModel | null> {
    return this.usersService.findOne(id);
  }

  @Mutation(() => UserModel)
  async createUser(@Args('input') input: CreateUserInput): Promise<UserModel> {
    return this.usersService.create(input);
  }

  @Mutation(() => Boolean)
  async deleteUser(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<boolean> {
    await this.usersService.remove(id);
    return true;
  }

  @ResolveField(() => String)
  fullName(@Parent() user: UserModel): string {
    return `${user.lastName} ${user.firstName}`;
  }
}
