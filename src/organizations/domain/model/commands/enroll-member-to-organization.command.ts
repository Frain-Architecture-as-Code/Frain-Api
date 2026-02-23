import { MemberRole } from '../valueobjects/member-role';
import { OrganizationId } from '../valueobjects/organization-id';
import { User } from 'src/shared/domain/model/user';

export class EnrollMemberToOrganizationCommand {
    constructor(
        public readonly organizationId: OrganizationId,
        public readonly role: MemberRole,
        public readonly user: User,
    ) {}
}
