import { StringPatternMismatchException } from '../../../shared/domain/exceptions/string-pattern-mismatch.exception';

export class InvalidOrganizationVisibilityException extends StringPatternMismatchException {
    constructor(value: string) {
        super(`Invalid organization visibility, ${value}`);
    }
}
