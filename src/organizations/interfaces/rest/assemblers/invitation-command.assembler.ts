import { SendInvitationCommand } from 'src/organizations/domain/model/commands/send-invitation.command';
import { SendInvitationRequest } from '../requests/send-invitation.request';
import { OrganizationId } from 'src/organizations/domain/model/valueobjects/organization-id';
import { User } from 'src/shared/domain/model/user';
import { EmailAddress } from 'src/shared/domain/model/valueobjects/email-address';

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
}
