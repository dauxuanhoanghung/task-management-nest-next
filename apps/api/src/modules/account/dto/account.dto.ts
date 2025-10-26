import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, MinLength } from 'class-validator';

@InputType()
export class RegisterInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(6)
  password: string;
}

@InputType()
export class LoginInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  password: string;
}

@InputType()
export class ChangePasswordInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  oldPassword: string;

  @Field()
  @MinLength(6)
  newPassword: string;
}
