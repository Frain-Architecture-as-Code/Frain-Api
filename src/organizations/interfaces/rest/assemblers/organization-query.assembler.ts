import { GetOrganizationByIdQuery } from 'src/organizations/domain/model/queries/get-organization-by-id.query';
import { GetUserOrganizationsQuery } from 'src/organizations/domain/model/queries/get-user-organizations.query';
import { OrganizationId } from 'src/organizations/domain/model/valueobjects/organization-id';
import { UserId } from 'src/shared/domain/model/valueobjects/user-id';

export class OrganizationQueryAssembler {
    static toGetOrganizationByIdQuery(id: string): GetOrganizationByIdQuery {
        return new GetOrganizationByIdQuery(OrganizationId.fromString(id));
    }

    static toGetUserOrganizationsQuery(
        userId: UserId,
    ): GetUserOrganizationsQuery {
        return new GetUserOrganizationsQuery(userId);
    }
}
