import { User } from '../../../../shared/domain/model/user';
import { GetApiKeysQuery } from '../../../domain/model/queries/get-project-api-keys.query';
import { OrganizationId } from '../../../domain/model/valueobjects/organization-id';
import { ProjectId } from '../../../domain/model/valueobjects/project-id';

export class ProjectApiKeyQueryAssembler {
    static toGetApiKeysQuery(
        organizationId: string,
        projectId: string,
        user: User,
    ): GetApiKeysQuery {
        return new GetApiKeysQuery(
            OrganizationId.fromString(organizationId),
            ProjectId.fromString(projectId),
            user,
        );
    }
}
