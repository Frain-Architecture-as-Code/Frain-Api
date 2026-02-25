import { Injectable } from '@nestjs/common';
import { MemberService } from '../../application/services/member.service';
import { MemberQueryAssembler } from '../../interfaces/rest/assemblers/member-query.assembler';
import { UserId } from '../../../shared/domain/model/valueobjects/user-id';
import { MemberRole } from '../../domain/model/valueobjects/member-role';

@Injectable()
export class OrganizationContextAcl {
    constructor(private readonly memberService: MemberService) {}

    async hasAccessToOrganization(
        userId: string,
        organizationId: string,
    ): Promise<boolean> {
        const query = MemberQueryAssembler.toExistsUserInOrganizationQuery(
            organizationId,
            UserId.fromString(userId),
        );

        const exists = await this.memberService.existsUserInOrganization(query);

        return exists;
    }

    async canCreateProject(
        userId: string,
        organizationId: string,
    ): Promise<boolean> {
        const member =
            await this.memberService.getMemberByUserIdAndOrganizationId(
                MemberQueryAssembler.toGetMemberByUserIdAndOrganizationIdQuery(
                    UserId.fromString(userId),
                    organizationId,
                ),
            );

        return member.canCreateProject();
    }

    async getMemberRoleByUserIdAndOrganizationId(
        userId: string,
        organizationId: string,
    ): Promise<MemberRole> {
        const member =
            await this.memberService.getMemberByUserIdAndOrganizationId(
                MemberQueryAssembler.toGetMemberByUserIdAndOrganizationIdQuery(
                    UserId.fromString(userId),
                    organizationId,
                ),
            );

        return member.role;
    }

    async getMemberIdByUserIdAndOrganizationId(
        userId: string,
        organizationId: string,
    ): Promise<string> {
        const member =
            await this.memberService.getMemberByUserIdAndOrganizationId(
                MemberQueryAssembler.toGetMemberByUserIdAndOrganizationIdQuery(
                    UserId.fromString(userId),
                    organizationId,
                ),
            );

        return member.id.toString();
    }

    async existsMemberInOrganization(
        memberId: string,
        organizationId: string,
    ): Promise<boolean> {
        const member = await this.memberService.existsMemberInOrganization(
            MemberQueryAssembler.toExistsMemberInOrganizationQuery(
                organizationId,
                memberId,
            ),
        );
        return member;
    }

    async getMemberRoleByMemberId(memberId: string): Promise<MemberRole> {
        const member = await this.memberService.getMemberById(
            MemberQueryAssembler.toGetMemberByIdQuery(memberId),
        );

        return member.role;
    }
}
