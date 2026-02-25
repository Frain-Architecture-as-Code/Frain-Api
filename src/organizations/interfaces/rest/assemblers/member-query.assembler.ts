import { GetMemberByUserIdAndOrganizationIdQuery } from '../../../domain/model/queries/get-member-by-user-id-and-organization-id.query';
import { GetOrganizationMembersQuery } from '../../../domain/model/queries/get-organization-members.query';
import { OrganizationId } from '../../../domain/model/valueobjects/organization-id';
import { UserId } from '../../../../shared/domain/model/valueobjects/user-id';
import { ExistsUserInOrganizationQuery } from '../../../domain/model/queries/exists-user-in-organization.query';
import { ExistsMemberInOrganizationQuery } from '../../../domain/model/queries/exists-member-in-organization.query';
import { MemberId } from '../../../domain/model/valueobjects/member-id';
import { GetMemberByIdQuery } from '../../../domain/model/queries/get-member-by-id.query';

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

    static toExistsUserInOrganizationQuery(
        organizationId: string,
        userId: UserId,
    ): ExistsUserInOrganizationQuery {
        return new ExistsUserInOrganizationQuery(
            OrganizationId.fromString(organizationId),
            userId,
        );
    }

    static toExistsMemberInOrganizationQuery(
        organizationId: string,
        memberId: string,
    ): ExistsMemberInOrganizationQuery {
        return new ExistsMemberInOrganizationQuery(
            MemberId.fromString(memberId),
            OrganizationId.fromString(organizationId),
        );
    }

    static toGetMemberByIdQuery(memberId: string): GetMemberByIdQuery {
        return new GetMemberByIdQuery(MemberId.fromString(memberId));
    }
}
