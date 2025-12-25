import { IRepository } from 'src/common/domain/repository.interface';
import { EmailTemplate } from '../entities/email-template.entity';

export interface IEmailTemplateRepository extends IRepository<EmailTemplate> {
  /**
   * Find an email template by its ID.
   * @param id - The ID of the email template.
   * @returns The email template if found, or null.
   */
  findById(id: number): Promise<EmailTemplate | null>;

  /**
   * Find an email template by its template code.
   * @param templateCode - The template code of the email template.
   * @returns The email template if found, or null.
   */
  findByTemplateCode(templateCode: string): Promise<EmailTemplate | null>;

  /**
   * Find all email templates.
   * @returns An array of email templates.
   */
  findAll(): Promise<EmailTemplate[]>;

  /**
   * Save a new email template.
   * @param template - The email template to save.
   * @returns The saved email template.
   */
  save(template: EmailTemplate): Promise<EmailTemplate>;

  /**
   * Update an existing email template.
   * @param id - The ID of the email template to update.
   * @param template - The updated email template data.
   * @returns The updated email template.
   */
  update(id: number, template: Partial<EmailTemplate>): Promise<EmailTemplate>;

  /**
   * Delete an email template by its ID.
   * @param id - The ID of the email template to delete.
   */
  delete(id: number): Promise<void>;

  /**
   * Check if an email template exists by its template code.
   * @param templateCode - The template code of the email template.
   * @returns True if the email template exists, false otherwise.
   */
  existsByTemplateCode(templateCode: string): Promise<boolean>;
}
