import { StringPatternMismatchException } from 'src/shared/domain/exceptions/string-pattern-mismatch.exception';
import z from 'zod';

export class InvitationId {
    private constructor(private readonly value: string) {}

    public static generate() {
        return new InvitationId(crypto.randomUUID());
    }

    public static fromString(value: string) {
        if (!z.uuid().safeParse(value).success) {
            throw new StringPatternMismatchException(
                `InvitationId must be a valid UUID. Received: ${value}`,
            );
        }
        return new InvitationId(value);
    }

    public toString(): string {
        return this.value;
    }

    public equals(other: InvitationId): boolean {
        return this.value === other.value;
    }
}
