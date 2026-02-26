import { User } from '../../../../shared/domain/model/user';
import { OrganizationId } from '../valueobjects/organization-id';
import { ProjectId } from '../valueobjects/project-id';
import { ProjectVisibility } from '../valueobjects/project-visibility';

export class UpdateProjectCommand {
    constructor(
        public readonly organizationId: OrganizationId,
        public readonly projectId: ProjectId,
        public readonly user: User,
        public readonly visibility: ProjectVisibility,
    ) {}
}
