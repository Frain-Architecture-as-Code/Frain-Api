import { Injectable } from '@nestjs/common';
import { CreateOrganizationCommand } from '../domain/model/commands/create-organization.command';
import { OrganizationId } from '../domain/model/valueobjects/organization-id';

@Injectable()
export class OrganizationsService {
  createOrganization(command: CreateOrganizationCommand): OrganizationId {
    return new OrganizationId('generated-id');
  }
}
