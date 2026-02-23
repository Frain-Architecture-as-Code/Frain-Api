import { SendInvitationCommand } from 'src/organizations/domain/model/commands/send-invitation.command';
import { SendInvitationRequest } from '../requests/send-invitation.request';
import { OrganizationId } from 'src/organizations/domain/model/valueobjects/organization-id';
import { User } from 'src/shared/domain/model/user';
import { EmailAddress } from 'src/shared/domain/model/valueobjects/email-address';
import { AcceptInvitationCommand } from 'src/organizations/domain/model/commands/accept-invitation.command';
import { InvitationId } from 'src/organizations/domain/model/valueobjects/invitation-id';
import { DeclineInvitationCommand } from 'src/organizations/domain/model/commands/decline-invitation.command';

export class InvitationCommandAssembler {
    static toSendInvitationCommand(
        user: User,
        organizationId: string,
        request: SendInvitationRequest,
    ): SendInvitationCommand {
        return new SendInvitationCommand(
            OrganizationId.fromString(organizationId),
            user,
            EmailAddress.fromString(request.targetEmail),
            request.role,
        );
    }

    static toAcceptInvitationCommand(
        user: User,
        invitationId: string,
    ): AcceptInvitationCommand {
        return new AcceptInvitationCommand(
            InvitationId.fromString(invitationId),
            user,
        );
    }

    static toDeclineInvitationCommand(
        user: User,
        invitationId: string,
    ): DeclineInvitationCommand {
        return new DeclineInvitationCommand(
            InvitationId.fromString(invitationId),
            user,
        );
    }
}
