import { MemberId } from '../valueobjects/member-id';

export class GetMemberByIdQuery {
    constructor(public readonly memberId: MemberId) {}
}
