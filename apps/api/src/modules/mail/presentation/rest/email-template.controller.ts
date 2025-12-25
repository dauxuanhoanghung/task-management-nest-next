import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';

import { CreateEmailTemplateDto } from '../../application/dto/create-email-template.dto';
import { UpdateEmailTemplateDto } from '../../application/dto/update-email-template.dto';
import { EmailTemplateService } from '../../application/services/email-template.service';
import { MailService } from '../../application/services/mail.service';

@Controller('email-templates')
export class EmailTemplateController {
  constructor(
    private readonly templateService: EmailTemplateService,
    private readonly mailService: MailService,
  ) {}

  @Post()
  create(@Body() dto: CreateEmailTemplateDto) {
    return this.templateService.create(dto);
  }

  @Get()
  findAll() {
    return this.templateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.templateService.findById(id);
  }

  @Get('code/:templateCode')
  findByCode(@Param('templateCode') templateCode: string) {
    return this.templateService.findByTemplateCode(templateCode);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateEmailTemplateDto,
  ) {
    return this.templateService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.templateService.delete(id);
    return { message: 'Template deleted successfully' };
  }

  // @Post('send')
  // async send(@Body() dto: SendEmailDto) {
  //   await this.mailService.sendFromTemplate(dto);
  //   return { message: 'Email sent successfully' };
  // }
}
