import { DomainException } from 'src/shared/domain/exceptions/domain.exception';
import { UserId } from 'src/shared/domain/model/valueobjects/user-id';

export class MemberAlreadyExistsException extends DomainException {
    constructor(userId: UserId) {
        super(`Member with user id ${userId.toString()} already exists`);
    }
}
