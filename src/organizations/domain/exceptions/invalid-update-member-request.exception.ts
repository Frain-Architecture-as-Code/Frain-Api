import { DomainException } from '../../../shared/domain/exceptions/domain.exception';
import { MemberName } from '../model/valueobjects/member-name';

export class InvalidUpdateMemberRequestException extends DomainException {
    constructor(name: MemberName) {
        super(
            `There is already a member with the name ${name.toString()} in the organization.`,
        );
    }
}
