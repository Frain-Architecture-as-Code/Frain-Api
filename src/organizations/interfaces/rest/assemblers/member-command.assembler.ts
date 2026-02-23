import { UpdateMemberCommand } from '../../../domain/model/commands/update-member.command';
import { User } from '../../../../shared/domain/model/user';
import { UpdateMemberRequest } from '../requests/update-member.request';
import { OrganizationId } from '../../../domain/model/valueobjects/organization-id';
import { MemberId } from '../../../domain/model/valueobjects/member-id';
import { MemberName } from '../../../domain/model/valueobjects/member-name';

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
