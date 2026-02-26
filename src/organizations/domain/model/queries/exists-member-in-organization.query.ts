import { MemberId } from '../valueobjects/member-id';
import { OrganizationId } from '../valueobjects/organization-id';

export class ExistsMemberInOrganizationQuery {
    constructor(
        public readonly memberId: MemberId,
        public readonly organizationId: OrganizationId,
    ) {}
}
