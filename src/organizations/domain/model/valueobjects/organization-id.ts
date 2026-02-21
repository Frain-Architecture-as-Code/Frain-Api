export class OrganizationId {
  constructor(private readonly value: string) {}

  static fromString(value: string): OrganizationId {
    return new OrganizationId(value);
  }

  toString(): string {
    return this.value;
  }
}
