import { OrganizationVisibility } from '../../../domain/model/valueobjects/organization-visibility';

export interface OrganizationResponse {
    organizationId: string;
    name: string;
    visibility: OrganizationVisibility;
    ownerMemberId: string;
    createdAt: Date;
    updatedAt: Date;
}
