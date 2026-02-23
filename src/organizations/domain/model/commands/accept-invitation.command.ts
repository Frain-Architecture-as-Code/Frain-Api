import { User } from '../../../../shared/domain/model/user';
import { InvitationId } from '../valueobjects/invitation-id';

export class AcceptInvitationCommand {
    constructor(
        public readonly invitationId: InvitationId,
        public readonly user: User,
    ) {}
}
