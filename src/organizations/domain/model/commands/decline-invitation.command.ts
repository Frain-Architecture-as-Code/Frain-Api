import { User } from 'src/shared/domain/model/user';
import { InvitationId } from '../valueobjects/invitation-id';

export class DeclineInvitationCommand {
    constructor(
        public readonly invitationId: InvitationId,
        public readonly user: User,
    ) {}
}
