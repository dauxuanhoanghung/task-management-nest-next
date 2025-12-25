import { IEmailTemplate } from './email-template.interface';

export class EmailTemplate implements IEmailTemplate {
  id?: number;
  templateCode: string; // e.g. "verify-user" (unique)
  subject: string;
  templateText: string; // raw HTML with {{variables}}
  style?: string | null; // optional inline css
  originalTemplateCode: string; // e.g. "verify-user", references default .hbs or .html
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  constructor(props: IEmailTemplate) {
    Object.assign(this, props);
  }
}
