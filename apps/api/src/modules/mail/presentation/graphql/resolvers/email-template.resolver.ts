import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { EmailTemplateService } from '../../../application/services/email-template.service';
import { CreateEmailTemplateInput } from '../inputs/create-email-template.input';
import { UpdateEmailTemplateInput } from '../inputs/update-email-template.input';
import { EmailTemplateModel } from '../models/email-template.model';

@Resolver(() => EmailTemplateModel)
export class EmailTemplateResolver {
  constructor(private readonly templateService: EmailTemplateService) {}

  @Mutation(() => EmailTemplateModel)
  async createEmailTemplate(
    @Args('input') input: CreateEmailTemplateInput,
  ): Promise<EmailTemplateModel> {
    const entity = await this.templateService.create(input);
    return this.toModel(entity);
  }

  @Query(() => [EmailTemplateModel])
  async emailTemplates(): Promise<EmailTemplateModel[]> {
    const entities = await this.templateService.findAll();
    return entities.map((e) => this.toModel(e));
  }

  @Query(() => EmailTemplateModel)
  async emailTemplate(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<EmailTemplateModel> {
    const entity = await this.templateService.findById(id);
    return this.toModel(entity);
  }

  @Query(() => EmailTemplateModel)
  async emailTemplateByCode(
    @Args('templateCode') templateCode: string,
  ): Promise<EmailTemplateModel> {
    const entity = await this.templateService.findByTemplateCode(templateCode);
    return this.toModel(entity);
  }

  @Mutation(() => EmailTemplateModel)
  async updateEmailTemplate(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateEmailTemplateInput,
  ): Promise<EmailTemplateModel> {
    const entity = await this.templateService.update(id, input);
    return this.toModel(entity);
  }

  @Mutation(() => Boolean)
  async deleteEmailTemplate(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<boolean> {
    await this.templateService.delete(id);
    return true;
  }

  // @Query(() => [String])
  // async getTemplateVariables(
  //   @Args('templateCode') templateCode: string,
  // ): Promise<string[]> {
  //   return this.templateService.getRequiredVariables(templateCode);
  // }

  private toModel(entity: any): EmailTemplateModel {
    return {
      id: entity.id,
      templateCode: entity.templateCode,
      subject: entity.subject,
      templateText: entity.templateText,
      style: entity.style,
      originalTemplateCode: entity.originalTemplateCode,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
