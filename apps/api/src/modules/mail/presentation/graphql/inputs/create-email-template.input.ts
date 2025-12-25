import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString, MinLength } from 'class-validator';

@InputType()
export class CreateEmailTemplateInput {
  @Field()
  @IsString()
  @MinLength(1)
  templateCode: string;

  @Field()
  @IsString()
  @MinLength(1)
  subject: string;

  @Field()
  @IsString()
  @MinLength(1)
  templateText: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  style?: string;

  @Field()
  @IsString()
  @MinLength(1)
  originalTemplateCode: string;
}
