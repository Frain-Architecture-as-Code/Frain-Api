import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { SendInvitationRequest } from './requests/send-invitation.request';
import { AuthGuard } from 'src/shared/infrastructure/security/auth.guard';
import { UserContext } from 'src/shared/infrastructure/security/user-context';
import { InvitationResponse } from './responses/invitation.response';

@UseGuards(AuthGuard)
@Controller('/api/v1/organizations/:organizationId/invitations')
export class InvitationController {
    constructor(private userContext: UserContext) {}

    @Get()
    async getInvitations() {}

    @Post()
    async sendInvitation(
        @Param('organizationId') organizationId: string,
        @Body() request: SendInvitationRequest,
    ): Promise<InvitationResponse> {
        const user = await this.userContext.user;

        return null as unknown as InvitationResponse;
    }
}
