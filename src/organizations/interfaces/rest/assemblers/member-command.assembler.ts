import { UpdateMemberCommand } from 'src/organizations/domain/model/commands/update-member.command';
import { User } from 'src/shared/domain/model/user';
import { UpdateMemberRequest } from '../requests/update-member.request';
import { OrganizationId } from 'src/organizations/domain/model/valueobjects/organization-id';
import { MemberId } from 'src/organizations/domain/model/valueobjects/member-id';
import { MemberName } from 'src/organizations/domain/model/valueobjects/member-name';

export class MemberCommandAssembler {
    static toUpdateMemberCommand(
        organizationId: string,
        memberId: string,
        user: User,
        request: UpdateMemberRequest,
    ): UpdateMemberCommand {
        return new UpdateMemberCommand(
            OrganizationId.fromString(organizationId),
            MemberId.fromString(memberId),
            user,
            request.newName
                ? MemberName.fromString(request.newName)
                : undefined,
            request.newRole,
        );
    }
}
