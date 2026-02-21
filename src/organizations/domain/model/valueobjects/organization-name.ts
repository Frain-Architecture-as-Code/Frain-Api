import { InvalidOrganizationNameException } from '../../exceptions/invalid-organization-name.exception';

export class OrganizationName {
  public static MIN_LENGTH = 3;
  public static MAX_LENGTH = 100;

  private constructor(public readonly value: string) {
    if (!OrganizationName.isValid(value)) {
      throw new Error('Invalid organization name');
    }
  }

  private static isValid(value: string): boolean {
    if (
      value.length >= OrganizationName.MIN_LENGTH &&
      value.length <= OrganizationName.MAX_LENGTH
    ) {
      return true;
    }

    throw new InvalidOrganizationNameException(value);
  }

  public static fromString(value: string): OrganizationName {
    return new OrganizationName(value);
  }
}
