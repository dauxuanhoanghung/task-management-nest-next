import { EmailTemplate } from './email-template.entity';
import { IEmailTemplate } from './email-template.interface';

export class EmailTemplateFactory {
  static create(props: IEmailTemplate): EmailTemplate {
    return new EmailTemplate(props);
  }

  static createDefault(
    templateCode: string,
    originalTemplateCode: string,
  ): EmailTemplate {
    return new EmailTemplate({
      templateCode,
      subject: `Default Subject for ${templateCode}`,
      templateText:
        '<html><body><h1>Default Template</h1><p>{{content}}</p></body></html>',
      style: null,
      originalTemplateCode,
    });
  }

  static reconstitute(props: IEmailTemplate): EmailTemplate {
    return new EmailTemplate({
      ...props,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  private static validate(params: {
    templateCode: string;
    subject: string;
    templateText: string;
    originalTemplateCode: string;
  }): void {
    if (!params.templateCode || params.templateCode.trim() === '') {
      throw new Error('Template code is required');
    }
    if (!params.subject || params.subject.trim() === '') {
      throw new Error('Subject is required');
    }
    if (!params.templateText || params.templateText.trim() === '') {
      throw new Error('Template text is required');
    }
    if (
      !params.originalTemplateCode ||
      params.originalTemplateCode.trim() === ''
    ) {
      throw new Error('Original template code is required');
    }
  }
}
