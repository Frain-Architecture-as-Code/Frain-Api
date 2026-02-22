import { StringLengthException } from 'src/shared/domain/exceptions/string-length.exception';
import { OrganizationName } from '../model/valueobjects/organization-name';

export class InvalidOrganizationNameException extends StringLengthException {
    constructor(value: string) {
        super(
            value,
            OrganizationName.MIN_LENGTH,
            OrganizationName.MAX_LENGTH,
            'Organization Name',
        );
    }
}
