import { GetMemberByUserIdAndOrganizationIdQuery } from '../../../domain/model/queries/get-member-by-user-id-and-organization-id.query';
import { GetOrganizationMembersQuery } from '../../../domain/model/queries/get-organization-members.query';
import { OrganizationId } from '../../../domain/model/valueobjects/organization-id';
import { UserId } from '../../../../shared/domain/model/valueobjects/user-id';

export class MemberQueryAssembler {
    static toGetMemberByUserIdAndOrganizationIdQuery(
        userId: UserId,
        organizationId: string,
    ): GetMemberByUserIdAndOrganizationIdQuery {
        return new GetMemberByUserIdAndOrganizationIdQuery(
            userId,
            OrganizationId.fromString(organizationId),
        );
    }

    static toGetOrganizationMembersQuery(
        organizationId: string,
        userId: UserId,
    ): GetOrganizationMembersQuery {
        return new GetOrganizationMembersQuery(
            OrganizationId.fromString(organizationId),
            userId,
        );
    }
}
