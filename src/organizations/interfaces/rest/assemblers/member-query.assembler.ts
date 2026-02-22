import { GetMemberByUserIdAndOrganizationIdQuery } from 'src/organizations/domain/model/queries/get-member-by-user-id-and-organization-id.query';
import { OrganizationId } from 'src/organizations/domain/model/valueobjects/organization-id';
import { UserId } from 'src/shared/domain/model/valueobjects/user-id';

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
}
