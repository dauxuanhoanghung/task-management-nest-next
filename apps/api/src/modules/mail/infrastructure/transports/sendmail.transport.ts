import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';

import { MailMessage } from '../../domain/entities/mail-message';
import { IMailTransport } from '../../domain/ports/mail-transport.interface';

export interface SendmailConfig {
  path: string;
  newline?: string;
  args?: string[];
}

const defaultConfig: SendmailConfig = {
  path: '/usr/sbin/sendmail',
  newline: 'unix',
  args: [],
};

@Injectable()
export class SendmailTransport implements IMailTransport {
  private transporter: Transporter;

  constructor(config: SendmailConfig = defaultConfig) {
    this.transporter = nodemailer.createTransport({
      sendmail: true,
      path: config.path,
      newline: config.newline || 'unix',
      args: config.args,
    });
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
    };

    await this.transporter.sendMail(mailOptions);
  }
}
