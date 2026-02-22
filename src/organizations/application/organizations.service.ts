import { Injectable } from '@nestjs/common';
import { CreateOrganizationCommand } from '../domain/model/commands/create-organization.command';
import { OrganizationId } from '../domain/model/valueobjects/organization-id';
import { InjectRepository } from '@nestjs/typeorm';
import { Organization } from '../domain/model/organization.entity';
import { Repository } from 'typeorm';
import { MemberId } from '../domain/model/valueobjects/member-id';
import { GetOrganizationByIdQuery } from '../domain/model/queries/get-organization-by-id.query';
import { Member } from '../domain/model/member.entity';
import { MemberName } from '../domain/model/valueobjects/member-name';
import { GetUserOrganizationsQuery } from '../domain/model/queries/get-user-organizations.query';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(Organization)
    private organizationRepository: Repository<Organization>,

    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
  ) {}

  async getUserOrganizations(query: GetUserOrganizationsQuery) {
    return this.organizationRepository
      .createQueryBuilder('org')
      .innerJoin(
        Member,
        'm',
        'm.organizationId = org.id AND m.userId = :userId',
        { userId: query.userId.toString() },
      )
      .getMany();
  }

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

    console.log(command.currentUser.userId);

    const member = Member.create({
      memberId: memberId,
      userId: command.currentUser.userId,
      organizationId: organizationId,
      name: MemberName.fromString(command.currentUser.username.name),
      picture: command.currentUser.picture,
    });

    await this.organizationRepository.save(organization);
    await this.memberRepository.save(member);

    return organizationId;
  }

  async getById(query: GetOrganizationByIdQuery): Promise<Organization> {
    return this.organizationRepository.findOneOrFail({
      where: { id: query.id },
    });
  }
}
