import { EmailAddress } from '../value-objects/mail-address.vo';
import { MailAttachment } from '../value-objects/mail-attachment.vo';
import { MailHeader } from '../value-objects/mail-header.vo';

export type MailPriority = 'high' | 'normal' | 'low';

export class MailMessage {
  private constructor(
    private readonly from: EmailAddress,
    private readonly to: EmailAddress[],
    private readonly subject: string,
    private readonly html?: string,
    private readonly text?: string,
    private readonly cc: EmailAddress[] = [],
    private readonly bcc: EmailAddress[] = [],
    private readonly replyTo?: EmailAddress,
    private readonly attachments: MailAttachment[] = [],
    private readonly headers: MailHeader[] = [],
    private readonly priority: MailPriority = 'normal',
  ) {}

  // Package-private constructor for builder use
  static createFromBuilder(
    from: EmailAddress,
    to: EmailAddress[],
    subject: string,
    html?: string,
    text?: string,
    cc?: EmailAddress[],
    bcc?: EmailAddress[],
    replyTo?: EmailAddress,
    attachments?: MailAttachment[],
    headers?: MailHeader[],
    priority?: MailPriority,
  ): MailMessage {
    return new MailMessage(
      from,
      to,
      subject,
      html,
      text,
      cc || [],
      bcc || [],
      replyTo,
      attachments || [],
      headers || [],
      priority || 'normal',
    );
  }

  getFrom(): EmailAddress {
    return this.from;
  }

  getTo(): EmailAddress[] {
    if (this.to instanceof EmailAddress) {
      return [this.to];
    }
    return [...this.to];
  }

  getSubject(): string {
    return this.subject;
  }

  getBody(): string {
    return this.html || this.text || '';
  }

  isHtmlBody(): boolean {
    return this.html !== undefined;
  }

  getCc(): EmailAddress[] {
    if (!this.cc) {
      return [];
    }
    if (this.cc instanceof EmailAddress) {
      return [this.cc];
    }
    return [...this.cc];
  }

  getBcc(): EmailAddress[] {
    if (!this.bcc) {
      return [];
    }
    if (this.bcc instanceof EmailAddress) {
      return [this.bcc];
    }
    return [...this.bcc];
  }

  getReplyTo(): EmailAddress | undefined {
    return this.replyTo;
  }

  getAttachments(): MailAttachment[] {
    return [...this.attachments];
  }

  getHeaders(): MailHeader[] {
    return [...this.headers];
  }

  getPriority(): MailPriority {
    return this.priority;
  }
}
