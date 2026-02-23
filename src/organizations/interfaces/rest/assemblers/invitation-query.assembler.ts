import { getInvitationsByOrganizationIdQuery } from 'src/organizations/domain/model/queries/get-invitations-by-organization-id.query';
import { OrganizationId } from 'src/organizations/domain/model/valueobjects/organization-id';
import { UserId } from 'src/shared/domain/model/valueobjects/user-id';

export class InvitationQueryAssembler {
    static toGetInvitationsByOrganizationIdQuery(
        organizationId: string,
        userId: UserId,
    ): getInvitationsByOrganizationIdQuery {
        return new getInvitationsByOrganizationIdQuery(
            OrganizationId.fromString(organizationId),
            userId,
        );
    }
}
