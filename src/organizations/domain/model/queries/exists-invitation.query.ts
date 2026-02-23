import { InvitationId } from '../valueobjects/invitation-id';

export class ExistsInvitationQuery {
    constructor(public readonly invitationId: InvitationId) {}
}
