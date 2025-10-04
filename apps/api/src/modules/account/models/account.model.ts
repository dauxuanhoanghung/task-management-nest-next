import { ObjectType, Field, Int } from '@nestjs/graphql';
import { AccountStatus } from '../account.entity';

@ObjectType()
export class AccountModel {
  @Field(() => Int)
  id: number;

  @Field()
  email: string;

  @Field(() => AccountStatus)
  status: AccountStatus;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
