import z from 'zod';
import { StringPatternMismatchException } from '../../exceptions/string-pattern-mismatch.exception';

export class Picture {
    private constructor(readonly url: string) {
        this.url = url;
    }

    public static isValid(url: string): boolean {
        return z.url().safeParse(url).success;
    }

    public static fromString(url: string): Picture {
        if (!this.isValid(url)) {
            throw new StringPatternMismatchException(
                `Invalid Picture URL: ${url}`,
            );
        }
        return new Picture(url);
    }

    public toString(): string {
        return this.url;
    }
}
