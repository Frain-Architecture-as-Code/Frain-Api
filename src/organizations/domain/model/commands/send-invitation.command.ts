import { User } from '../../../../shared/domain/model/user';
import { EmailAddress } from '../../../../shared/domain/model/valueobjects/email-address';
import { OrganizationId } from '../valueobjects/organization-id';
import { MemberRole } from '../valueobjects/member-role';

export class SendInvitationCommand {
    constructor(
        public readonly organizationId: OrganizationId,
        public readonly user: User,
        public readonly targetEmail: EmailAddress,
        public readonly role: MemberRole,
    ) {}
}
