import { IsEmail, IsObject, IsOptional, IsString } from 'class-validator';

export class SendEmailDto {
  @IsEmail({}, { each: true })
  to: string | string[];

  @IsString()
  templateCode: string;

  @IsObject()
  context: Record<string, any>;

  @IsEmail()
  @IsOptional()
  from?: string;

  @IsEmail({}, { each: true })
  @IsOptional()
  cc?: string | string[];

  @IsEmail({}, { each: true })
  @IsOptional()
  bcc?: string | string[];
}
