import { GetOrganizationByIdQuery } from 'src/organizations/domain/model/queries/get-organization-by-id.query';
import { OrganizationId } from 'src/organizations/domain/model/valueobjects/organization-id';

export class OrganizationQueryAssembler {
  static toGetOrganizationByIdQuery(
    id: OrganizationId,
  ): GetOrganizationByIdQuery {
    return new GetOrganizationByIdQuery(id);
  }
}
