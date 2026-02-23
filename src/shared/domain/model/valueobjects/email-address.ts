import z from 'zod';
import { StringPatternMismatchException } from '../../exceptions/string-pattern-mismatch.exception';

export class EmailAddress {
    private constructor(private readonly value: string) {}

    public static isValid(email: string) {
        const emailSchema = z.email();
        return emailSchema.safeParse(email).success;
    }

    public static fromString(email: string) {
        if (!this.isValid(email)) {
            throw new StringPatternMismatchException(
                `Invalid Email Address: ${email}`,
            );
        }
        return new EmailAddress(email);
    }

    public equals(other: EmailAddress): boolean {
        return this.value === other.value;
    }
}
