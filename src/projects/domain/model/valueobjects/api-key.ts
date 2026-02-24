import { randomBytes } from 'crypto';
import { StringPatternMismatchException } from '../../../../shared/domain/exceptions/string-pattern-mismatch.exception';

export class ApiKey {
    public static PREFIX = 'frain_';
    private static KEY_LENGTH = 32; // 32 bytes = 256 bits

    private constructor(private readonly value: string) {}

    public static fromString(value: string) {
        if (!value.startsWith(ApiKey.PREFIX)) {
            throw new StringPatternMismatchException(
                `ApiKey must start with '${ApiKey.PREFIX}'. Received: ${value}`,
            );
        }
        return new ApiKey(value);
    }

    public static generate(): ApiKey {
        const random = randomBytes(ApiKey.KEY_LENGTH).toString('hex');
        return new ApiKey(`${ApiKey.PREFIX}${random}`);
    }

    public toString(): string {
        return this.value;
    }
}
