export class MailHeader {
  private constructor(
    private readonly key: string,
    private readonly value: string,
  ) {}

  static create(key: string, value: string): MailHeader {
    if (!key || !value) {
      throw new Error('Header key and value are required');
    }
    return new MailHeader(key, value);
  }

  getKey(): string {
    return this.key;
  }

  getValue(): string {
    return this.value;
  }

  equals(other: MailHeader): boolean {
    return this.key === other.key && this.value === other.value;
  }
}
