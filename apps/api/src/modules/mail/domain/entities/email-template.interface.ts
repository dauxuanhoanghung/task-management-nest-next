export interface IEmailTemplate {
  id?: number;
  // e.g. "verify-user" (unique)
  templateCode: string;
  subject: string;
  // raw HTML with {{variables}}
  templateText: string;
  // optional inline css
  style?: string | null;
  // e.g. "verify-user", references default .hbs or .html (src/templates/**/* folder)
  originalTemplateCode: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}
