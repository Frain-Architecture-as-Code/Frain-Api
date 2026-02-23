import { DomainException } from '../../../shared/domain/exceptions/domain.exception';
import { InvitationStatus } from '../model/valueobjects/invitation-status';

export class InvalidInvitationStatusChangeException extends DomainException {
    constructor(
        currentStatus: InvitationStatus,
        targetStatus: InvitationStatus,
    ) {
        super(
            `Trying to update an invitation to status '${targetStatus}' when it is already '${currentStatus}'`,
        );
    }
}
