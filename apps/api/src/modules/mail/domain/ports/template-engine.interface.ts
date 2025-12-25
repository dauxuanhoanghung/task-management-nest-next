export interface ITemplateEngine {
  compile(template: string, variables: Record<string, any>): string;
}
