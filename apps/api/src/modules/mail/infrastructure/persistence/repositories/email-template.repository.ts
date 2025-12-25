import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IEmailTemplateRepository } from '../../../domain/repositories/email-template.repository.interface';
import { EmailTemplateMapper } from '../../mappers/email-template.mapper';

import { EmailTemplate } from 'src/modules/mail/domain/entities/email-template.entity';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { EmailTemplateSchema } from '../schemas/email-template.schema';

@Injectable()
export class EmailTemplateRepository implements IEmailTemplateRepository {
  constructor(
    @InjectRepository(EmailTemplateSchema)
    private readonly repository: Repository<EmailTemplateSchema>,
  ) {}

  async findById(id: number): Promise<EmailTemplate | null> {
    const schema = await this.repository.findOne({ where: { id } });
    return schema ? EmailTemplateMapper.toDomain(schema) : null;
  }

  async findByTemplateCode(
    templateCode: string,
  ): Promise<EmailTemplate | null> {
    const schema = await this.repository.findOne({ where: { templateCode } });
    return schema ? EmailTemplateMapper.toDomain(schema) : null;
  }

  async findAll(): Promise<EmailTemplate[]> {
    const schemas = await this.repository.find();
    return schemas.map((schema) => EmailTemplateMapper.toDomain(schema));
  }

  async save(template: EmailTemplate): Promise<EmailTemplate> {
    const schema = EmailTemplateMapper.toPersistence(
      template,
    ) as EmailTemplateSchema;
    const saved = await this.repository.save(schema);
    return EmailTemplateMapper.toDomain(saved);
  }

  async update(
    id: number,
    template: Partial<EmailTemplate>,
  ): Promise<EmailTemplate> {
    await this.repository.update(
      id,
      template as QueryDeepPartialEntity<EmailTemplateSchema>,
    );
    const updated = await this.repository.findOne({ where: { id } });
    return EmailTemplateMapper.toDomain(updated!);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async existsByTemplateCode(templateCode: string): Promise<boolean> {
    const exists = await this.repository.exists({ where: { templateCode } });
    return exists;
  }

  async exists(id: number): Promise<boolean> {
    const exists = await this.repository.exists({ where: { id } });
    return exists;
  }
}
