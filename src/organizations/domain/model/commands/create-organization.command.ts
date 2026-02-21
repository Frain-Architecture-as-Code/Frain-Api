import { OrganizationName } from '../valueobjects/organization-name';
import { OrganizationVisibility } from '../valueobjects/organization-visibility';

export class CreateOrganizationCommand {
  constructor(
    public readonly name: OrganizationName,
    public readonly visibility: OrganizationVisibility,
    public readonly ownerUserId: string,
  ) {}
}
