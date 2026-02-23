import { GetOrganizationByIdQuery } from '../../../domain/model/queries/get-organization-by-id.query';
import { GetUserOrganizationsQuery } from '../../../domain/model/queries/get-user-organizations.query';
import { OrganizationId } from '../../../domain/model/valueobjects/organization-id';
import { UserId } from '../../../../shared/domain/model/valueobjects/user-id';

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
