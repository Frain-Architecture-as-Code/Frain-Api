import { OrganizationId } from '../valueobjects/organization-id';

export class GetOrganizationByIdQuery {
  constructor(public readonly id: OrganizationId) {}
}
