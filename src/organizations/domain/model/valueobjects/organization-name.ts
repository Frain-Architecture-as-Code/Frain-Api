export class OrganizationName {
  public static MIN_LENGTH = 3;
  public static MAX_LENGTH = 100;

  constructor(public readonly value: string) {
    if (!OrganizationName.isValid(value)) {
      throw new Error('Invalid organization name');
    }
  }

  public static isValid(value: string): boolean {
    return (
      value.length >= OrganizationName.MIN_LENGTH &&
      value.length <= OrganizationName.MAX_LENGTH
    );
  }

  public static fromString(value: string): OrganizationName {
    return new OrganizationName(value);
  }
}
