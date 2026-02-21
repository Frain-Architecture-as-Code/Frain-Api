import { StringPatternMismatchException } from 'src/shared/domain/exceptions/string-pattern-mismatch.exception';
import z from 'zod';

export class MemberId {
  private constructor(private readonly value: string) {}

  public static generate() {
    return new MemberId(crypto.randomUUID());
  }

  public static fromString(value: string) {
    if (!z.uuid().safeParse(value).success) {
      throw new StringPatternMismatchException(
        `MemberId must be a valid UUID. Received: ${value}`,
      );
    }
    return new MemberId(value);
  }

  public toString(): string {
    return this.value;
  }
}
