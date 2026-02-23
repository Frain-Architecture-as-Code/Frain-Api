import { UserId } from 'src/shared/domain/model/valueobjects/user-id';
import { OrganizationId } from '../valueobjects/organization-id';

export class GetOrganizationMembersQuery {
    constructor(
        public readonly organizationId: OrganizationId,
        public readonly userId: UserId,
    ) {}
}
