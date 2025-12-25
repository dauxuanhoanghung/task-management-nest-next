import { EmailTemplate } from '../../domain/entities/email-template.entity';
import { EmailTemplateFactory } from '../../domain/entities/email-template.factory';
import { IEmailTemplate } from '../../domain/entities/email-template.interface';

export class EmailTemplateMapper {
  static toDomain(raw: IEmailTemplate): EmailTemplate {
    return EmailTemplateFactory.reconstitute({
      id: raw.id,
      templateCode: raw.templateCode,
      subject: raw.subject,
      templateText: raw.templateText,
      style: raw.style,
      originalTemplateCode: raw.originalTemplateCode,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
  }

  static toPersistence(entity: EmailTemplate): any {
    return {
      id: entity.id,
      templateCode: entity.templateCode,
      subject: entity.subject,
      templateText: entity.templateText,
      style: entity.style,
      originalTemplateCode: entity.originalTemplateCode,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
