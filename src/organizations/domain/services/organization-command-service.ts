import { CreateOrganizationCommand } from '../model/commands/create-organization.command';
import { OrganizationId } from '../model/valueobjects/organization-id';

export interface OrganizationCommandService {
  handle(command: CreateOrganizationCommand): OrganizationId;
}
