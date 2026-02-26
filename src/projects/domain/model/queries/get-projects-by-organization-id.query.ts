import { User } from '../../../../shared/domain/model/user';
import { OrganizationId } from '../valueobjects/organization-id';

export class GetProjectsByOrganizationIdQuery {
    constructor(
        public readonly organizationId: OrganizationId,
        public readonly user: User,
    ) {}
}
