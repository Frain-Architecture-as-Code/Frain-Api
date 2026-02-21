import { OrganizationVisibility } from 'src/organizations/domain/model/valueobjects/organization-visibility';

export class CreateOrganizationRequest {
  name: string;
  visibility: OrganizationVisibility;

  constructor(name: string, visibility: OrganizationVisibility) {
    this.name = name;
    if (visibility === OrganizationVisibility.PRIVATE) {
      this.visibility = OrganizationVisibility.PRIVATE;
    } else if (visibility === OrganizationVisibility.PUBLIC) {
      this.visibility = OrganizationVisibility.PUBLIC;
    }
  }
}
