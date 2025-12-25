import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  Optional,
} from '@nestjs/common';

import { EmailTemplate } from '../../domain/entities/email-template.entity';
import { EmailTemplateFactory } from '../../domain/entities/email-template.factory';
import { IEmailTemplateRepository } from '../../domain/repositories/email-template.repository.interface';
import { EMAIL_TEMPLATE_REPOSITORY } from '../../mail.tokens';
import { CreateEmailTemplateDto } from '../dto/create-email-template.dto';
import { UpdateEmailTemplateDto } from '../dto/update-email-template.dto';

@Injectable()
export class EmailTemplateService {
  constructor(
    @Optional()
    @Inject(EMAIL_TEMPLATE_REPOSITORY)
    private readonly repository: IEmailTemplateRepository,
  ) {}

  async create(dto: CreateEmailTemplateDto): Promise<EmailTemplate> {
    // Check if template code already exists
    const exists = await this.repository.existsByTemplateCode(dto.templateCode);
    if (exists) {
      throw new ConflictException(
        `Template with code '${dto.templateCode}' already exists`,
      );
    }

    const template = EmailTemplateFactory.create(dto);
    return this.repository.save(template);
  }

  async findById(id: number): Promise<EmailTemplate> {
    const template = await this.repository.findById(id);
    if (!template) {
      throw new NotFoundException(`Email template with ID ${id} not found`);
    }
    return template;
  }

  async findByTemplateCode(templateCode: string): Promise<EmailTemplate> {
    const template = await this.repository.findByTemplateCode(templateCode);
    if (!template) {
      throw new NotFoundException(
        `Email template with code '${templateCode}' not found`,
      );
    }
    return template;
  }

  async findAll(): Promise<EmailTemplate[]> {
    return this.repository.findAll();
  }

  async update(
    id: number,
    dto: UpdateEmailTemplateDto,
  ): Promise<EmailTemplate> {
    const template = await this.findById(id);

    if (dto.subject) {
      template.subject = dto.subject;
    }
    if (dto.templateText) {
      template.templateText = dto.templateText;
    }
    if (dto.style !== undefined) {
      template.style = dto.style;
    }

    return this.repository.update(id, template);
  }

  async delete(id: number): Promise<void> {
    await this.findById(id);
    await this.repository.delete(id);
  }
}
