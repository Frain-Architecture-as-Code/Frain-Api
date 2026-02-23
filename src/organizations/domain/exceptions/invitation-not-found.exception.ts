import { NotFoundException } from '@nestjs/common';
import { InvitationId } from '../model/valueobjects/invitation-id';

export class InvitationNotFoundException extends NotFoundException {
    constructor(invitationId: InvitationId) {
        super(`Invitation with id ${invitationId.toString()} not exists`);
    }
}
