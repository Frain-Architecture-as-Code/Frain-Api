import { OrganizationVisibility } from 'src/organizations/domain/model/valueobjects/organization-visibility';

export interface OrganizationResponse {
    id: string;
    name: string;
    visibility: OrganizationVisibility;
    ownerMemberId: string;
    createdAt: string;
    updatedAt: string;
}
