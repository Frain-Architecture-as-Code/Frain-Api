import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { SendInvitationRequest } from './requests/send-invitation.request';
import { AuthGuard } from 'src/shared/infrastructure/security/auth.guard';
import { UserContext } from 'src/shared/infrastructure/security/user-context';
import { InvitationResponse } from './responses/invitation.response';
import { InvitationCommandAssembler } from './assemblers/invitation-command.assembler';
import { InvitationService } from 'src/organizations/application/invitation.service';
import { InvitationAssembler } from './assemblers/invitation.assembler';
import { InvitationQueryAssembler } from './assemblers/invitation-query.assembler';
import { MemberService } from 'src/organizations/application/member.service';

@UseGuards(AuthGuard)
@Controller('/api/v1/organizations/:organizationId/invitations')
export class InvitationController {
    constructor(
        private userContext: UserContext,
        private invitationService: InvitationService,
        private memberService: MemberService,
    ) {}

    @Get()
    async getInvitations(@Param('organizationId') organizationId: string) {
        const user = this.userContext.user;

        const query =
            InvitationQueryAssembler.toGetInvitationsByOrganizationIdQuery(
                organizationId,
                user.id,
            );

        const invitations =
            await this.invitationService.getInvitationsByOrganizationId(query);

        return InvitationAssembler.toResponseListFromEntities(invitations);
    }

    @Post()
    async sendInvitation(
        @Param('organizationId') organizationId: string,
        @Body() request: SendInvitationRequest,
    ): Promise<InvitationResponse> {
        const user = this.userContext.user;

        const command = InvitationCommandAssembler.toSendInvitationCommand(
            user,
            organizationId,
            request,
        );

        const invitation = await this.invitationService.sendInvitation(command);

        return InvitationAssembler.toResponseFromEntity(invitation);
    }
}
