import { StringPatternMismatchException } from '../../../../shared/domain/exceptions/string-pattern-mismatch.exception';
import z from 'zod';

export class NotificationId {
    private constructor(private readonly value: string) {}

    public static generate() {
        return new NotificationId(crypto.randomUUID());
    }

    public static fromString(value: string) {
        if (!z.uuid().safeParse(value).success) {
            throw new StringPatternMismatchException(
                `NotificationId must be a valid UUID. Received: ${value}`,
            );
        }
        return new NotificationId(value);
    }

    public toString(): string {
        return this.value;
    }

    public equals(other: NotificationId): boolean {
        return this.value === other.value;
    }
}
