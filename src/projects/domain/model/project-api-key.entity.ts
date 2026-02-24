import { OrganizationId } from './valueobjects/organization-id';
import { ProjectId } from './valueobjects/project-id';

export class ProjectApiKeyEntity {
    constructor(
        public readonly projectId: ProjectId,
        public readonly organizationId: OrganizationId,
        public readonly apiKey: string,
    ) {}
}
