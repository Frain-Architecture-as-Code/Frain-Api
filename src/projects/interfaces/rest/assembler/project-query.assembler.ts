import { User } from '../../../../shared/domain/model/user';
import { GetProjectsByOrganizationIdQuery } from '../../../domain/model/queries/get-projects-by-organization-id.query';
import { OrganizationId } from '../../../domain/model/valueobjects/organization-id';

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
}
