import { User } from '../../../../shared/domain/model/user';
import { GetProjectByIdQuery } from '../../../domain/model/queries/get-project-by-id.query';
import { GetProjectsByOrganizationIdQuery } from '../../../domain/model/queries/get-projects-by-organization-id.query';
import { OrganizationId } from '../../../domain/model/valueobjects/organization-id';
import { ProjectId } from '../../../domain/model/valueobjects/project-id';

export class ProjectQueryAssembler {
    static toGetProjectsByOrganizationIdQuery(
        organizationId: string,
        user: User,
    ): GetProjectsByOrganizationIdQuery {
        return new GetProjectsByOrganizationIdQuery(
            OrganizationId.fromString(organizationId),
            user,
        );
    }

    static toGetProjectByIdQuery(
        organizationId: string,
        projectId: string,
        user: User,
    ): GetProjectByIdQuery {
        return new GetProjectByIdQuery(
            OrganizationId.fromString(organizationId),
            ProjectId.fromString(projectId),
            user,
        );
    }
}
