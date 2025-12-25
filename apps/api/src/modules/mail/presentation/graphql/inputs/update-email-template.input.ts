import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString, MinLength } from 'class-validator';

@InputType()
export class UpdateEmailTemplateInput {
  @Field({ nullable: true })
  @IsString()
  @MinLength(1)
  @IsOptional()
  subject?: string;

  @Field({ nullable: true })
  @IsString()
  @MinLength(1)
  @IsOptional()
  templateText?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  style?: string;
}
