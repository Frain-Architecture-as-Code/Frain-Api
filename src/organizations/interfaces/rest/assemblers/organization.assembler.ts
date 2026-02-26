import { Organization } from '../../../domain/model/organization.entity';
import { OrganizationResponse } from '../responses/organization.response';

export class OrganizationAssembler {
    static toResponseFromEntity(entity: Organization): OrganizationResponse {
        return {
            organizationId: entity.id.toString(),
            name: entity.name.toString(),
            visibility: entity.visibility,
            ownerMemberId: entity.ownerMemberId.toString(),
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        };
    }

    static toResponseListFromEntities(
        organizations: Organization[],
    ): OrganizationResponse[] {
        return organizations.map((org) => this.toResponseFromEntity(org));
    }
}
