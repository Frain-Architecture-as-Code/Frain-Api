import { OrganizationVisibility } from 'src/organizations/domain/model/valueobjects/organization-visibility';

export class CreateOrganizationRequest {
  name: string;
  visibility: OrganizationVisibility;
}
