import { Inject, Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';

import { MailMessage } from '../../domain/entities/mail-message';
import { IMailTransport } from '../../domain/ports/mail-transport.interface';
import { SMTP_CONFIG } from '../../mail.tokens';

export interface SmtpConfig {
  host: string;
  port: number;
  secure?: boolean;
  auth?: {
    user: string;
    pass: string;
  };
}

@Injectable()
export class SmtpTransport implements IMailTransport {
  private transporter: Transporter;

  constructor(@Inject(SMTP_CONFIG) private readonly config: SmtpConfig) {
    this.transporter = nodemailer.createTransport(this.config);
  }

  async send(message: MailMessage): Promise<void> {
    const mailOptions = {
      from: message.getFrom().toString(),
      to: message.getTo().map((addr) => addr.toString()),
      cc: message.getCc().map((addr) => addr.toString()),
      bcc: message.getBcc().map((addr) => addr.toString()),
      subject: message.getSubject(),
      text: message.isHtmlBody() ? undefined : message.getBody(),
      html: message.isHtmlBody() ? message.getBody() : undefined,
      replyTo: message.getReplyTo()?.toString(),
      attachments: message.getAttachments().map((att) => ({
        filename: att.getFilename(),
        content: att.getContent(),
        contentType: att.getContentType(),
        encoding: att.getEncoding(),
      })),
      priority: message.getPriority(),
      headers: Object.fromEntries(
        message
          .getHeaders()
          .map((header) => [header.getKey(), header.getValue()]),
      ),
    };

    await this.transporter.sendMail(mailOptions);
  }
}
