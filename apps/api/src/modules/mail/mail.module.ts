import { DynamicModule, Module, Provider, Type } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmailTemplateService } from './application/services/email-template.service';
import {
  MailService,
  MailServiceConfig,
} from './application/services/mail.service';

import { EmailMessageBuilder } from './domain/entities/mail-message.builder';
import { IMailTransport } from './domain/ports/mail-transport.interface';
import { ITemplateEngine } from './domain/ports/template-engine.interface';

import { EmailTemplateRepository } from './infrastructure/persistence/repositories/email-template.repository';
import { EmailTemplateSchema } from './infrastructure/persistence/schemas/email-template.schema';
import { HandlebarsTemplateEngine } from './infrastructure/template-engines/handlebars.engine';

import {
  EMAIL_TEMPLATE_REPOSITORY,
  MAIL_CONFIG,
  MAIL_MESSAGE_BUILDER,
  MAIL_SERVICE,
  MAIL_TRANSPORT,
  TEMPLATE_ENGINE,
} from './mail.tokens';

import { EmailTemplateResolver } from './presentation/graphql/resolvers/email-template.resolver';
import { EmailTemplateController } from './presentation/rest/email-template.controller';

/**
 * OPTIONS
 */
export interface MailModuleOptions {
  /** Transport provided as CLASS (recommended) */
  useClass?: Type<IMailTransport>;

  /** Transport provided as FACTORY */
  useFactory?: (...args: any[]) => IMailTransport;

  /** Dependencies for transportFactory */
  inject?: any[];

  /** Mail service config */
  config: MailServiceConfig;

  /** Optional template engine */
  templateEngine?: ITemplateEngine;
}

/**
 * MODULE
 */
@Module({
  imports: [TypeOrmModule.forFeature([EmailTemplateSchema])],
  providers: [
    EmailTemplateService,
    EmailTemplateResolver,
    MailService,
    {
      provide: EMAIL_TEMPLATE_REPOSITORY,
      useClass: EmailTemplateRepository,
    },
  ],
  controllers: [EmailTemplateController],
  exports: [EmailTemplateService],
})
export class MailModule {
  /**
   * GLOBAL DEFAULT MAIL
   */
  static forRoot(options: MailModuleOptions): DynamicModule {
    let transportProvider: Provider;

    if (options.useFactory) {
      transportProvider = {
        provide: MAIL_TRANSPORT,
        useFactory: options.useFactory,
        inject: options.inject ?? [],
      };
    } else if (options.useClass) {
      transportProvider = {
        provide: MAIL_TRANSPORT,
        useClass: options.useClass,
      };
    } else {
      throw new Error(
        'MailModule.forRoot requires transportClass or transportFactory',
      );
    }

    const providers: Provider[] = [
      transportProvider,
      {
        provide: MAIL_CONFIG,
        useValue: options.config,
      },
      {
        provide: TEMPLATE_ENGINE,
        useValue: options.templateEngine ?? new HandlebarsTemplateEngine(),
      },
      {
        provide: MAIL_MESSAGE_BUILDER,
        useClass: EmailMessageBuilder,
      },
      {
        provide: MAIL_SERVICE,
        useClass: MailService,
      },
    ];

    return {
      global: true,
      module: MailModule,
      providers,
      exports: [MAIL_SERVICE],
    };
  }

  /**
   * PER-MODULE OVERRIDE
   */
  static forFeature(options: {
    service?: Type<MailService>;
    transport?: IMailTransport;
    config?: MailServiceConfig;
    builder?: Type<EmailMessageBuilder>;
    templateEngine?: ITemplateEngine;
  }): DynamicModule {
    const providers: Provider[] = [];

    if (options.transport) {
      providers.push({
        provide: MAIL_TRANSPORT,
        useValue: options.transport,
      });
    }

    if (options.config) {
      providers.push({
        provide: MAIL_CONFIG,
        useValue: options.config,
      });
    }

    if (options.templateEngine) {
      providers.push({
        provide: TEMPLATE_ENGINE,
        useValue: options.templateEngine,
      });
    }

    providers.push(
      {
        provide: MAIL_MESSAGE_BUILDER,
        useClass: options.builder ?? EmailMessageBuilder,
      },
      {
        provide: MAIL_SERVICE,
        useClass: options.service ?? MailService,
      },
    );

    return {
      module: MailModule,
      providers,
      exports: [MAIL_SERVICE],
    };
  }
}
