import { User } from '../../../../shared/domain/model/user';
import { MemberId } from '../valueobjects/member-id';
import { OrganizationId } from '../valueobjects/organization-id';
import { ProjectId } from '../valueobjects/project-id';

export class CreateApiKeyCommand {
    constructor(
        public readonly organizationId: OrganizationId,
        public readonly projectId: ProjectId,
        public readonly memberId: MemberId,
        public readonly user: User,
    ) {}
}
