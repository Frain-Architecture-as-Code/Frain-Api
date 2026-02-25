import { User } from '../../../../shared/domain/model/user';
import { OrganizationId } from '../valueobjects/organization-id';
import { ProjectApiKeyId } from '../valueobjects/project-api-key-id';
import { ProjectId } from '../valueobjects/project-id';

export class RevokeProjectApiKeyCommand {
    constructor(
        public readonly organizationId: OrganizationId,
        public readonly projectId: ProjectId,
        public readonly projectApiKey: ProjectApiKeyId,
        public readonly user: User,
    ) {}
}
