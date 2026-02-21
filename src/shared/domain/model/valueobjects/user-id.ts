import z from 'zod';
import { StringPatternMismatchException } from '../../exceptions/string-pattern-mismatch.exception';

export class UserId {
  private constructor(readonly value: string) {
    this.value = value;
  }

  public static isValid(value: string) {
    return z.uuid().safeParse(value).success;
  }

  public static fromString(value: string) {
    if (!this.isValid(value)) {
      throw new StringPatternMismatchException(
        `User Id is not a uuid: ${value}`,
      );
    }

    return new UserId(value);
  }
}
