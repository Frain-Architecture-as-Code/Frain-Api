import { CreateOrganizationCommand } from 'src/organizations/domain/model/commands/create-organization.command';
import { CreateOrganizationRequest } from '../requests/create-organization.request';
import { OrganizationName } from 'src/organizations/domain/model/valueobjects/organization-name';
import { User } from 'src/shared/domain/model/user';

export class OrganizationCommandAssembler {
  public static toCreateOrganizationCommand(
    request: CreateOrganizationRequest,
    user: User,
  ): CreateOrganizationCommand {
    return new CreateOrganizationCommand(
      OrganizationName.schema.parse({ value: request.name }),
      request.visibility,
      user,
    );
  }
}
