export interface IMailAttachment {
  filename: string;
  content?: Buffer | string;
  path?: string;
}

export class MailAttachment {
  private constructor(
    private readonly filename: string,
    private readonly content: Buffer | string,
    private readonly contentType?: string,
    private readonly encoding?: string,
  ) {}

  static create(
    filename: string,
    content: Buffer | string,
    contentType?: string,
    encoding: string = 'base64',
  ): MailAttachment {
    if (!filename) {
      throw new Error('Attachment filename is required');
    }
    return new MailAttachment(filename, content, contentType, encoding);
  }

  getFilename(): string {
    return this.filename;
  }

  getContent(): Buffer | string {
    return this.content;
  }

  getContentType(): string | undefined {
    return this.contentType;
  }

  getEncoding(): string | undefined {
    return this.encoding;
  }
}
