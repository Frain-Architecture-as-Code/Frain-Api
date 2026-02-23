import { UserId } from '../../../../shared/domain/model/valueobjects/user-id';
import { OrganizationId } from '../valueobjects/organization-id';

export class GetMemberByUserIdAndOrganizationIdQuery {
    constructor(
        public readonly userId: UserId,
        public readonly organizationId: OrganizationId,
    ) {}
}
