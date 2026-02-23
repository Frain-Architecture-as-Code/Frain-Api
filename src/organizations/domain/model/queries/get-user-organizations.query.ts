import { UserId } from '../../../../shared/domain/model/valueobjects/user-id';

export class GetUserOrganizationsQuery {
    constructor(public readonly userId: UserId) {}
}
