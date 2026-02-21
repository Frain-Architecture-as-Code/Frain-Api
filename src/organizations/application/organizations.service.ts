import { Injectable } from '@nestjs/common';
import { CreateOrganizationCommand } from '../domain/model/commands/create-organization.command';
import { OrganizationId } from '../domain/model/valueobjects/organization-id';
import { InjectRepository } from '@nestjs/typeorm';
import { Organization } from '../domain/model/organization.entity';
import { Repository } from 'typeorm';
import { MemberId } from '../domain/model/valueobjects/member-id';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(Organization)
    private usersRepository: Repository<Organization>,
  ) {}

  async createOrganization(
    command: CreateOrganizationCommand,
  ): Promise<OrganizationId> {
    const organizationId = OrganizationId.generate();
    const memberId = MemberId.generate();

    const organization = Organization.create({
      id: organizationId,
      name: command.name,
      visibility: command.visibility,
      ownerMemberId: memberId,
    });
    // TODO: add member creation flow

    await this.usersRepository.save(organization);

    return organizationId;
  }
}
