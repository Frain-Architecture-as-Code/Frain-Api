import { randomBytes } from 'crypto';
import { StringPatternMismatchException } from '../../../../shared/domain/exceptions/string-pattern-mismatch.exception';

export class ApiKeySecret {
    public static PREFIX = 'frain_';
    private static KEY_LENGTH = 32;
    private static REDACTED_VALUE = 'frain_****************';

    private constructor(private readonly value: string) {}

    public static fromString(value: string) {
        if (!value.startsWith(ApiKeySecret.PREFIX)) {
            throw new StringPatternMismatchException(
                `ApiKeySecret must start with '${ApiKeySecret.PREFIX}'. Received: ${value}`,
            );
        }
        return new ApiKeySecret(value);
    }

    public static generate(): ApiKeySecret {
        const random = randomBytes(ApiKeySecret.KEY_LENGTH).toString('hex');
        return new ApiKeySecret(`${ApiKeySecret.PREFIX}${random}`);
    }

    public static redacted(): ApiKeySecret {
        return new ApiKeySecret(ApiKeySecret.REDACTED_VALUE);
    }

    public toString(): string {
        return this.value;
    }
}
