import { MailMessage } from '../entities/mail-message';

export interface IMailTransport {
  send(message: MailMessage): Promise<void> | void;
}
