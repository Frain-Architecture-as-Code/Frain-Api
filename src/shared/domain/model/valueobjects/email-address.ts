import z from 'zod';
import { StringPatternMismatchException } from '../../exceptions/string-pattern-mismatch.exception';

export class EmailAddress {
  private constructor(readonly email: string) {
    this.email = email;
  }

  public static isValid(email: string) {
    const emailSchema = z.email();
    return emailSchema.safeParse(email).success;
  }

  private static fromString(email: string) {
    if (!this.isValid(email)) {
      throw new StringPatternMismatchException(
        `Invalid Email Address: ${email}`,
      );
    }
    return new EmailAddress(email);
  }
}
