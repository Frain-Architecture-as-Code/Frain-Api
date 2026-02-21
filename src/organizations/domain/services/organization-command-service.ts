import { CreateOrganizationCommand } from '../model/commands/create-organization.command';

export interface OrganizationCommandService {
  handle(command: CreateOrganizationCommand): OrganizationId;
}
