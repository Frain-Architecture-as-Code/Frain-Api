import { EmailAddress } from '../../../shared/domain/model/valueobjects/email-address';
import { Invitation } from '../model/invitation.entity';
import { OrganizationName } from '../model/valueobjects/organization-name';

export class InvitationSentEvent {
    constructor(
        public readonly invitation: Invitation,
        public readonly senderEmail: EmailAddress,
        public readonly organizationName: OrganizationName,
    ) {}
}
