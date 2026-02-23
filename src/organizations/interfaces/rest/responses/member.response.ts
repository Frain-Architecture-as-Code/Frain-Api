import { MemberRole } from 'src/organizations/domain/model/valueobjects/member-role';

export interface MemberResponse {
    memberId: string;
    userId: string;
    organizationId: string;
    memberName: string;
    memberRole: MemberRole;
    picture: string;
    createdAt: string;
    updatedAt: string;
}
