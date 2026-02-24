import { StringPatternMismatchException } from '../../../../shared/domain/exceptions/string-pattern-mismatch.exception';
import z from 'zod';

export class ProjectApiKeyId {
    private constructor(private readonly value: string) {}

    public static generate() {
        return new ProjectApiKeyId(crypto.randomUUID());
    }

    public static fromString(value: string) {
        if (!z.uuid().safeParse(value).success) {
            throw new StringPatternMismatchException(
                `ProjectApiKeyId must be a valid UUID. Received: ${value}`,
            );
        }
        return new ProjectApiKeyId(value);
    }

    public toString(): string {
        return this.value;
    }

    public equals(other: ProjectApiKeyId): boolean {
        return this.value === other.value;
    }
}
