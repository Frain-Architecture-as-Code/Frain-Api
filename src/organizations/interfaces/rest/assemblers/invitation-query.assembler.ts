import { getInvitationsByOrganizationIdQuery } from '../../../domain/model/queries/get-invitations-by-organization-id.query';
import { OrganizationId } from '../../../domain/model/valueobjects/organization-id';
import { UserId } from '../../../../shared/domain/model/valueobjects/user-id';

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
