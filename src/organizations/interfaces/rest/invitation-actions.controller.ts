import { Controller, Param, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserContext } from '../../../shared/infrastructure/security/user-context';
import { InvitationCommandAssembler } from './assemblers/invitation-command.assembler';
import { InvitationService } from '../../application/services/invitation.service';
import { InvitationId } from '../../domain/model/valueobjects/invitation-id';

@Controller('/api/v1/invitations/:invitationId')
@ApiTags('Invitations')
export class InvitationActionsController {
    constructor(
        private userContext: UserContext,
        private invitationService: InvitationService,
    ) {}
    @Patch('/accept')
    async acceptInvitation(
        @Param('invitationId') invitationId: string,
    ): Promise<InvitationId> {
        const user = this.userContext.user;

        const command = InvitationCommandAssembler.toAcceptInvitationCommand(
            user,
            invitationId,
        );

        const acceptedInvitationId =
            await this.invitationService.acceptInvitation(command);

        return acceptedInvitationId;
    }

    @Patch('/decline')
    async declineInvitation(
        @Param('invitationId') invitationId: string,
    ): Promise<InvitationId> {
        const user = this.userContext.user;

        const command = InvitationCommandAssembler.toDeclineInvitationCommand(
            user,
            invitationId,
        );

        const result = await this.invitationService.declineInvitation(command);

        return result;
    }
}
