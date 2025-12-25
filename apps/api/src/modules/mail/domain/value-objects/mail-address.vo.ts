export class EmailAddress {
  private constructor(
    private readonly email: string,
    private readonly name?: string,
  ) {}

  static create(email: string, name?: string): EmailAddress {
    if (!this.isValid(email)) {
      throw new Error(`Invalid email address: ${email}`);
    }
    return new EmailAddress(email, name);
  }

  private static isValid(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  getEmail(): string {
    return this.email;
  }

  getName(): string | undefined {
    return this.name;
  }

  toString(): string {
    return this.name ? `${this.name} <${this.email}>` : this.email;
  }

  equals(other: EmailAddress): boolean {
    return this.email === other.email;
  }
}
