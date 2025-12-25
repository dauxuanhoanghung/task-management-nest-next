import { Injectable, Logger } from '@nestjs/common';

import { MailMessage } from '../../domain/entities/mail-message';
import { IMailTransport } from '../../domain/ports/mail-transport.interface';

@Injectable()
export class ConsoleTransport implements IMailTransport {
  private readonly logger = new Logger(ConsoleTransport.name);

  // eslint-disable-next-line @typescript-eslint/require-await
  async send(message: MailMessage): Promise<void> {
    this.logger.log('==== EMAIL SENT (Console Transport) ====');
    this.logger.log('From:', message.getFrom().toString());
    this.logger.log(
      'To:',
      message
        .getTo()
        .map((addr) => addr.toString())
        .join(', '),
    );
    this.logger.log(
      'CC:',
      message
        .getCc()
        .map((addr) => addr.toString())
        .join(', '),
    );
    this.logger.log('Subject:', message.getSubject());
    this.logger.log('Body:', message.getBody());
    this.logger.log('Attachments:', message.getAttachments().length);
    this.logger.log('========================================');
  }
}
