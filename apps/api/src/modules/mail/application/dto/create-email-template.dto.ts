import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreateEmailTemplateDto {
  @IsString()
  @MinLength(1)
  templateCode: string;

  @IsString()
  @MinLength(1)
  subject: string;

  @IsString()
  @MinLength(1)
  templateText: string;

  @IsString()
  @IsOptional()
  style?: string;

  @IsString()
  @MinLength(1)
  originalTemplateCode: string;
}
