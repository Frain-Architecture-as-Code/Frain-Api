import { StringPatternMismatchException } from '../../../../shared/domain/exceptions/string-pattern-mismatch.exception';
import z from 'zod';

export class ResourceId {
    private constructor(private readonly value: string) {}

    public static generate() {
        return new ResourceId(crypto.randomUUID());
    }

    public static fromString(value: string) {
        if (!z.uuid().safeParse(value).success) {
            throw new StringPatternMismatchException(
                `ResourceId must be a valid UUID. Received: ${value}`,
            );
        }
        return new ResourceId(value);
    }

    public toString(): string {
        return this.value;
    }

    public equals(other: ResourceId): boolean {
        return this.value === other.value;
    }
}
