import z from 'zod';
import { StringPatternMismatchException } from '../../exceptions/string-pattern-mismatch.exception';

export class UserName {
  private constructor(readonly name: string) {}

  public static fromString(name: string): UserName {
    if (!this.isValid(name)) {
      throw new StringPatternMismatchException(`Invalid User Name: ${name}`);
    }
    return new UserName(name);
  }

  private static isValid(name: string): boolean {
    return z.string().safeParse(name).success;
  }
}
