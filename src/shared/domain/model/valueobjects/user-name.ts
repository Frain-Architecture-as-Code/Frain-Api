import z from 'zod';
import { StringPatternMismatchException } from '../../exceptions/string-pattern-mismatch.exception';

export class UserName {
    private constructor(readonly value: string) {}

    public static fromString(value: string): UserName {
        if (!this.isValid(value)) {
            throw new StringPatternMismatchException(
                `Invalid User Name: ${value}`,
            );
        }
        return new UserName(value);
    }

    private static isValid(value: string): boolean {
        return z.string().safeParse(value).success;
    }

    public toString(): string {
        return this.value;
    }
}
