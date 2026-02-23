import { NotFoundException } from 'src/shared/domain/exceptions/not-found-exception';
import { MemberId } from '../model/valueobjects/member-id';

export class MemberNotFoundException extends NotFoundException {
    constructor(memberId: MemberId) {
        super(`Member with ID ${memberId.toString()} not found`);
    }
}
