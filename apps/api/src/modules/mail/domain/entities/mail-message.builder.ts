import { EmailAddress } from '../value-objects/mail-address.vo';
import { MailAttachment } from '../value-objects/mail-attachment.vo';
import { MailHeader } from '../value-objects/mail-header.vo';
import { MailMessage, MailPriority } from './mail-message';

// ============================================================================
// DOMAIN LAYER - Factories (Builder Pattern)
// ============================================================================
export class EmailMessageBuilder {
  private from?: EmailAddress;
  private to: EmailAddress[] = [];
  private cc: EmailAddress[] = [];
  private bcc: EmailAddress[] = [];
  private replyTo?: EmailAddress;
  private subject?: string;
  private html?: string;
  private text?: string;
  private headers: MailHeader[] = [];
  private attachments: MailAttachment[] = [];
  private priority?: MailPriority;

  // ============================================================================
  // FROM addresses modifiers
  // ============================================================================
  setFrom(email: string, name?: string): this {
    this.from = EmailAddress.create(email, name);
    return this;
  }

  setFromAddress(address: EmailAddress): this {
    this.from = address;
    return this;
  }

  // ============================================================================
  // TO addresses modifiers
  // ============================================================================
  addTo(address: EmailAddress): EmailMessageBuilder {
    this.to.push(address);
    return this;
  }

  addToAddress(address: EmailAddress): this {
    this.to.push(address);
    return this;
  }

  setTo(addresses: EmailAddress | EmailAddress[]): this {
    this.to = Array.isArray(addresses) ? [...addresses] : [addresses];
    return this;
  }

  // ============================================================================
  // CC addresses modifiers
  // ============================================================================
  addCc(email: string, name?: string): this {
    this.cc.push(EmailAddress.create(email, name));
    return this;
  }

  addCcAddress(address: EmailAddress): this {
    this.cc.push(address);
    return this;
  }

  setCc(addresses: EmailAddress | EmailAddress[]): this {
    this.cc = Array.isArray(addresses) ? [...addresses] : [addresses];
    return this;
  }

  // ============================================================================
  // BCC addresses modifiers
  // ============================================================================
  addBcc(email: string, name?: string): this {
    this.bcc.push(EmailAddress.create(email, name));
    return this;
  }

  addBccAddress(address: EmailAddress): this {
    this.bcc.push(address);
    return this;
  }

  setBcc(addresses: EmailAddress | EmailAddress[]): this {
    this.bcc = Array.isArray(addresses) ? [...addresses] : [addresses];
    return this;
  }

  // ============================================================================
  // REPLY-TO addresses modifiers
  // ============================================================================
  setReplyTo(email: string, name?: string): this {
    this.replyTo = EmailAddress.create(email, name);
    return this;
  }

  setReplyToAddress(address: EmailAddress): this {
    this.replyTo = address;
    return this;
  }

  // ============================================================================
  // ATTACHMENTS modifiers
  // ============================================================================
  addAttachment(attachment: MailAttachment): EmailMessageBuilder {
    this.attachments.push(attachment);
    return this;
  }

  setAttachments(attachments: MailAttachment[]): EmailMessageBuilder {
    this.attachments = [...attachments];
    return this;
  }

  // ============================================================================
  // EMAIL HEADERS modifiers
  // ============================================================================
  addHeader(key: string, value: string): EmailMessageBuilder {
    this.headers.push(MailHeader.create(key, value));
    return this;
  }

  addHeaderObject(header: MailHeader): EmailMessageBuilder {
    this.headers.push(header);
    return this;
  }

  setHeaders(headers: MailHeader[]): this {
    this.headers = [...headers];
    return this;
  }

  // ============================================================================
  // EMAIL CONTENT modifiers
  // ============================================================================
  setSubject(subject: string): EmailMessageBuilder {
    this.subject = subject;
    return this;
  }

  setHtml(html?: string): EmailMessageBuilder {
    this.html = html;
    return this;
  }

  setText(text?: string): EmailMessageBuilder {
    this.text = text;
    return this;
  }

  build(): MailMessage {
    this.validate();

    return MailMessage.createFromBuilder(
      this.from!,
      this.to,
      this.subject!,
      this.html,
      this.text,
      this.cc,
      this.bcc,
      this.replyTo,
      this.attachments,
      this.headers,
      this.priority,
    );
  }

  private validate(): void {
    if (!this.from) {
      throw new Error('From address is required');
    }
    if (this.to.length === 0) {
      throw new Error('At least one recipient is required');
    }
    if (!this.subject) {
      throw new Error('Subject is required');
    }
    if (!this.html && !this.text) {
      throw new Error('Either HTML or text body is required');
    }
  }
}
