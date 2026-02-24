import { StringPatternMismatchException } from '../../../../shared/domain/exceptions/string-pattern-mismatch.exception';
import z from 'zod';

export class OrganizationId {
    private constructor(private readonly value: string) {}

    public static generate() {
        return new OrganizationId(crypto.randomUUID());
    }

    public static fromString(value: string) {
        if (!z.uuid().safeParse(value).success) {
            throw new StringPatternMismatchException(
                `OrganizationId must be a valid UUID. Received: ${value}`,
            );
        }
        return new OrganizationId(value);
    }

    public toString(): string {
        return this.value;
    }

    public equals(other: OrganizationId): boolean {
        return this.value === other.value;
    }
}
