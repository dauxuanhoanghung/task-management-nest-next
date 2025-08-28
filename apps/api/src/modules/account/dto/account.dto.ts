import { InputType, Field } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  MinLength,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { AccountStatus } from '../account.entitty';

import { registerEnumType } from '@nestjs/graphql';

registerEnumType(AccountStatus, {
  name: 'AccountStatus',
  description: 'The status of the account',
});

@InputType()
export class CreateAccountInput {
  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field()
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;
}

@InputType()
export class UpdateAccountInput {
  @Field({ nullable: true })
  @IsString()
  @MinLength(6)
  @IsOptional()
  password?: string;

  @Field(() => AccountStatus, { nullable: true })
  @IsEnum(AccountStatus)
  @IsOptional()
  status?: AccountStatus;
}
