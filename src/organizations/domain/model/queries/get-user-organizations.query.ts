import { UserId } from 'src/shared/domain/model/valueobjects/user-id';

export class GetUserOrganizationsQuery {
  constructor(public readonly userId: UserId) {}
}
