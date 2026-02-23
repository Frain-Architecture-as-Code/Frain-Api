import { User } from '../../../../shared/domain/model/user';
import { OrganizationId } from '../valueobjects/organization-id';
import { MemberId } from '../valueobjects/member-id';
import { MemberName } from '../valueobjects/member-name';
import { MemberRole } from '../valueobjects/member-role';

export class UpdateMemberCommand {
    constructor(
        public readonly organizationId: OrganizationId,
        public readonly toUpdatememberId: MemberId,
        public readonly user: User,
        public readonly newMemberName?: MemberName,
        public readonly newMemberRole?: MemberRole,
    ) {}
}
