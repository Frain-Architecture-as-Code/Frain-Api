import { User } from '../../../../shared/domain/model/user';
import { OrganizationId } from '../valueobjects/organization-id';
import { ProjectVisibility } from '../valueobjects/project-visibility';

export class CreateProjectCommand {
    constructor(
        public readonly organizationId: OrganizationId,
        public readonly user: User,
        public readonly visiblity: ProjectVisibility,
    ) {}
}
