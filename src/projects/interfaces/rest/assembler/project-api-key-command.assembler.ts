import { User } from '../../../../shared/domain/model/user';
import { CreateProjectApiKeyCommand } from '../../../domain/model/commands/create-project-api-key.command';
import { RevokeProjectApiKeyCommand } from '../../../domain/model/commands/revoke-project-api-key.command';
import { MemberId } from '../../../domain/model/valueobjects/member-id';
import { OrganizationId } from '../../../domain/model/valueobjects/organization-id';
import { ProjectApiKeyId } from '../../../domain/model/valueobjects/project-api-key-id';
import { ProjectId } from '../../../domain/model/valueobjects/project-id';
import { CreateProjectApiKeyRequest } from '../requests/create-project-api-key.request';

export class ProjectApiKeyCommandAssembler {
    static toCreateProjectApiKeyCommand(
        organizationId: string,
        projectId: string,
        user: User,
        request: CreateProjectApiKeyRequest,
    ): CreateProjectApiKeyCommand {
        return new CreateProjectApiKeyCommand(
            OrganizationId.fromString(organizationId),
            ProjectId.fromString(projectId),
            MemberId.fromString(request.targetMemberId),
            user,
        );
    }

    static toRevokeProjectApiKeyCommand(
        organizationId: string,
        projectId: string,
        projectApiKeyId: string,
        user: User,
    ): RevokeProjectApiKeyCommand {
        return new RevokeProjectApiKeyCommand(
            OrganizationId.fromString(organizationId),
            ProjectId.fromString(projectId),
            ProjectApiKeyId.fromString(projectApiKeyId),
            user,
        );
    }
}
