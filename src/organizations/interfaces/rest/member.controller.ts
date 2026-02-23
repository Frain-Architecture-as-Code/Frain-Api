import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    UseGuards,
} from '@nestjs/common';
import { MemberService } from 'src/organizations/application/member.service';
import { UserContext } from 'src/shared/infrastructure/security/user-context';
import { MemberQueryAssembler } from './assemblers/member-query.assembler';
import { MemberResponse } from './responses/member.response';
import { MemberAssembler } from './assemblers/member.assembler';
import { UpdateMemberRequest } from './requests/update-member.request';
import { MemberCommandAssembler } from './assemblers/member-command.assembler';
import { AuthGuard } from 'src/shared/infrastructure/security/auth.guard';

@UseGuards(AuthGuard)
@Controller('api/v1/organizations/:organizationId/members')
export class MembersController {
    constructor(
        private userContext: UserContext,
        private memberService: MemberService,
    ) {}

    @Get()
    async getMembers(
        @Param('organizationId') organizationId: string,
    ): Promise<MemberResponse[]> {
        const user = this.userContext.user;

        const query = MemberQueryAssembler.toGetOrganizationMembersQuery(
            organizationId,
            user.id,
        );

        const members = await this.memberService.getOrganizationMembers(query);

        return MemberAssembler.toResponseListFromEntities(members);
    }

    @Patch(':memberId')
    async updateMember(
        @Param('organizationId') organizationId: string,
        @Param('memberId') memberId: string,
        @Body() request: UpdateMemberRequest,
    ): Promise<MemberResponse> {
        const user = this.userContext.user;

        const command = MemberCommandAssembler.toUpdateMemberCommand(
            organizationId,
            memberId,
            user,
            request,
        );

        const udpatedMember = await this.memberService.updateMember(command);

        return MemberAssembler.toResponseFromEntity(udpatedMember);
    }

    @Delete(':memberId')
    async kickMember() {}

    @Get(':memberId')
    async getMemberById() {}
}
