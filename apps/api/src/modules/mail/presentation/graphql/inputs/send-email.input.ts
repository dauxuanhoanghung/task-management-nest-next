import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { GraphQLJSONObject } from 'graphql-type-json';

@InputType()
export class SendEmailInput {
  @Field(() => [String])
  @IsEmail({}, { each: true })
  to: string[];

  @Field()
  @IsString()
  templateCode: string;

  @Field(() => GraphQLJSONObject)
  context: Record<string, any>;

  @Field({ nullable: true })
  @IsEmail()
  @IsOptional()
  from?: string;

  @Field(() => [String], { nullable: true })
  @IsEmail({}, { each: true })
  @IsOptional()
  cc?: string[];

  @Field(() => [String], { nullable: true })
  @IsEmail({}, { each: true })
  @IsOptional()
  bcc?: string[];
}
