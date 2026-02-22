import { UserId } from 'src/shared/domain/model/valueobjects/user-id';
import { OrganizationId } from '../valueobjects/organization-id';

export class DeleteOrganizationCommand {
  constructor(
    public readonly userId: UserId,
    public readonly organizationId: OrganizationId,
  ) {}
}
