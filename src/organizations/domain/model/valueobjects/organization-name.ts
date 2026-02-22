import { StringLengthException } from 'src/shared/domain/exceptions/string-length.exception';

export class OrganizationName {
    public static MIN_LENGTH = 3;
    public static MAX_LENGTH = 100;

    private constructor(private readonly value: string) {}

    public static fromString(value: string) {
        if (value.length < this.MIN_LENGTH || value.length > this.MAX_LENGTH) {
            throw new StringLengthException(
                value,
                this.MIN_LENGTH,
                this.MAX_LENGTH,
                OrganizationName.name,
            );
        }

        return new OrganizationName(value);
    }

    public toString(): string {
        return this.value;
    }
}
