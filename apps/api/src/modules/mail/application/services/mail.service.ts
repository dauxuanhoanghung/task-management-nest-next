import { Inject, Injectable } from '@nestjs/common';

import { MailMessage } from '../../domain/entities/mail-message';
import { EmailMessageBuilder } from '../../domain/entities/mail-message.builder';
import { IMailTransport } from '../../domain/ports/mail-transport.interface';
import { ITemplateEngine } from '../../domain/ports/template-engine.interface';
import { EmailAddress } from '../../domain/value-objects/mail-address.vo';
import { IMailAttachment } from '../../domain/value-objects/mail-attachment.vo';
import {
  MAIL_CONFIG,
  MAIL_MESSAGE_BUILDER,
  MAIL_TRANSPORT,
  TEMPLATE_ENGINE,
} from '../../mail.tokens';

/**
 * MAIL SERVICE CONFIG, Defaults can be set in MailModule
 */
export interface MailServiceConfig {
  from: string;
  fromName?: string;
}

@Injectable()
export class MailService {
  constructor(
    @Inject(MAIL_TRANSPORT) private readonly transport: IMailTransport,
    @Inject(MAIL_CONFIG) private readonly config: MailServiceConfig,
    @Inject(MAIL_MESSAGE_BUILDER)
    private readonly builder: EmailMessageBuilder,
    @Inject(TEMPLATE_ENGINE) private readonly templateEngine: ITemplateEngine,
  ) {}

  async send(message: MailMessage): Promise<void> {
    await this.transport.send(message);
  }

  async sendSimple(params: {
    to: string | string[];
    subject: string;
    body: string;
    isHtml?: boolean;
    from?: string;
    fromName?: string;
  }): Promise<void> {
    const fromEmail = params.from || this.config.from;
    const fromName = params.fromName || this.config.fromName;
    const toAddresses = Array.isArray(params.to) ? params.to : [params.to];

    const builder = this.builder
      .setFrom(fromEmail, fromName)
      .setTo(toAddresses.map((email) => EmailAddress.create(email)))
      .setSubject(params.subject);
    if (params.isHtml) {
      builder.setHtml(params.body);
    } else {
      builder.setText(params.body);
    }

    const message = builder.build();

    await this.send(message);
  }

  async sendFromTemplate(params: {
    to: string | string[];
    subject: string;
    template: string;
    variables: Record<string, any>;
    isHtml?: boolean;
    from?: string;
    fromName?: string;
    attachments?: IMailAttachment[];
  }): Promise<void> {
    const compiledBody = this.templateEngine.compile(
      params.template,
      params.variables,
    );

    const compiledSubject = this.templateEngine.compile(
      params.subject,
      params.variables,
    );

    await this.sendSimple({
      to: params.to,
      subject: compiledSubject,
      body: compiledBody,
      isHtml: params.isHtml,
      from: params.from,
      fromName: params.fromName,
    });
  }
}
