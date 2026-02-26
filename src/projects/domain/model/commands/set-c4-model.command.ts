import { C4Model } from '../valueobjects/c4-model';
import { OrganizationId } from '../valueobjects/organization-id';
import { ProjectId } from '../valueobjects/project-id';

export class SetC4ModelCommand {
    constructor(
        public readonly projectId: ProjectId,
        public readonly organizationId: OrganizationId,
        public readonly c4Model: C4Model,
    ) {}
}
