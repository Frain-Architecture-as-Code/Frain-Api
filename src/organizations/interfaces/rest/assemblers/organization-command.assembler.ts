import { CreateOrganizationCommand } from 'src/organizations/domain/model/commands/create-organization.command';
import { CreateOrganizationRequest } from '../requests/create-organization.request';
import { OrganizationName } from 'src/organizations/domain/model/valueobjects/organization-name';
import { organizationVisibilityFromString } from 'src/organizations/domain/model/valueobjects/organization-visibility';

export class OrganizationCommandAssembler {
  public static toCreateOrganizationCommand(
    request: CreateOrganizationRequest,
  ): CreateOrganizationCommand {
    return new CreateOrganizationCommand(
      OrganizationName.fromString(request.name),
      organizationVisibilityFromString(request.visibility),
      '',
    );
  }
}
