import { OrganizationId } from '../valueobjects/organization-id';
import { ProjectId } from '../valueobjects/project-id';

export class GetC4ModelViewsQuery {
    constructor(
        public readonly projectId: ProjectId,
        public readonly organizationId: OrganizationId,
        public readonly viewId: string,
    ) {}
}
