import * as Handlebars from 'handlebars';

import { ITemplateEngine } from '../../domain/ports/template-engine.interface';

export class HandlebarsTemplateEngine implements ITemplateEngine {
  compile(template: string, variables: Record<string, any>): string {
    const compiled = Handlebars.compile(template);
    return compiled(variables);
  }
}
