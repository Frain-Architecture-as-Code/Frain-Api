import { Invitation } from 'src/organizations/domain/model/invitation.entity';
import { InvitationResponse } from '../responses/invitation.response';

export class InvitationAssembler {
    static toResponseFromEntity(invitation: Invitation): InvitationResponse {
        return {
            invitationId: invitation.id.toString(),
            targetEmail: invitation.targetEmail.toString(),
            organizationId: invitation.organizationId.toString(),
            inviterId: invitation.inviterId.toString(),
            role: invitation.role,
            createdAt: invitation.createdAt,
            updatedAt: invitation.updatedAt,
        };
    }

    static toResponseListFromEntities(
        invitations: Invitation[],
    ): InvitationResponse[] {
        return invitations.map((invitation) =>
            InvitationAssembler.toResponseFromEntity(invitation),
        );
    }
}
