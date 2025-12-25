import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateEmailTemplateDto {
  @IsString()
  @IsOptional()
  @MinLength(1)
  subject?: string;

  @IsString()
  @IsOptional()
  @MinLength(1)
  templateText?: string;

  @IsString()
  @IsOptional()
  style?: string;
}
