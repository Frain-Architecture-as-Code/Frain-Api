import { Controller, Param, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('/api/v1/invitations/:invitationId')
@ApiTags('Invitations')
export class InvitationActionsController {
    @Patch('/accept')
    async acceptInvitation(
        @Param('invitationId') invitationId: string,
    ): Promise<void> {
        // Implementation to accept an invitation
    }

    @Patch('/decline')
    async declineInvitation(
        @Param('invitationId') invitationId: string,
    ): Promise<void> {
        // Implementation to accept an invitation
    }
}
