import { Injectable } from '@nestjs/common';
import { MemberService } from '../../application/services/member.service';
import { MemberQueryAssembler } from '../../interfaces/rest/assemblers/member-query.assembler';
import { UserId } from '../../../shared/domain/model/valueobjects/user-id';

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

    async canCreateProject(userId: string, organizationId: string) {
        const member =
            await this.memberService.getMemberByUserIdAndOrganizationId(
                MemberQueryAssembler.toGetMemberByUserIdAndOrganizationIdQuery(
                    UserId.fromString(userId),
                    organizationId,
                ),
            );

        return member.canCreateProject();
    }
}
