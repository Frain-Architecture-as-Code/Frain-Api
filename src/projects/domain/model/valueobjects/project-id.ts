import { StringPatternMismatchException } from '../../../../shared/domain/exceptions/string-pattern-mismatch.exception';
import z from 'zod';

export class ProjectId {
    private constructor(private readonly value: string) {}

    public static generate() {
        return new ProjectId(crypto.randomUUID());
    }

    public static fromString(value: string) {
        if (!z.uuid().safeParse(value).success) {
            throw new StringPatternMismatchException(
                `ProjectId must be a valid UUID. Received: ${value}`,
            );
        }
        return new ProjectId(value);
    }

    public toString(): string {
        return this.value;
    }

    public equals(other: ProjectId): boolean {
        return this.value === other.value;
    }
}
