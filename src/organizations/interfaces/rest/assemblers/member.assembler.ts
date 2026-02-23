import { Member } from 'src/organizations/domain/model/member.entity';
import { MemberResponse } from '../responses/member.response';

export class MemberAssembler {
    static toResponseFromEntity(member: Member): MemberResponse {
        return {
            memberId: member.id.toString(),
            userId: member.userId.toString(),
            organizationId: member.organizationId.toString(),
            memberName: member.name.toString(),
            memberRole: member.role,
            picture: member.picture.toString(),
            createdAt: member.createdAt,
            updatedAt: member.updatedAt,
        };
    }

    static toResponseListFromEntities(members: Member[]): MemberResponse[] {
        return members.map((member) => this.toResponseFromEntity(member));
    }
}
