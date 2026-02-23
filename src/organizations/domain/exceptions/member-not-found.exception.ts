import { NotFoundException } from '@nestjs/common';
import { MemberId } from '../model/valueobjects/member-id';

export class MemberNotFoundException extends NotFoundException {
    constructor(memberId: MemberId) {
        super(`Member with ID ${memberId.toString()} not found`);
    }
}
