import { User } from '../../../../shared/domain/model/user';
import { OrganizationId } from '../valueobjects/organization-id';
import { ProjectId } from '../valueobjects/project-id';

export class GetProjectByIdQuery {
    constructor(
        public readonly organizationId: OrganizationId,
        public readonly projectId: ProjectId,
        public readonly user: User,
    ) {}
}
