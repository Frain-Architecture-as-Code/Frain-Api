import { Repository } from 'typeorm';
import { Organization } from '../../../domain/model/organization.entity';
import { OrganizationId } from '../../../domain/model/valueobjects/organization-id';
import { Injectable } from '@nestjs/common';
import { OrganizationNotFoundException } from '../../../domain/exceptions/organization-not-found.exception';
import { InjectRepository } from '@nestjs/typeorm';
import { UserId } from '../../../../shared/domain/model/valueobjects/user-id';
import { Member } from '../../../domain/model/member.entity';
import { Invitation } from '../../../domain/model/invitation.entity';

@Injectable()
export class OrganizationRepository {
    constructor(
        @InjectRepository(Organization)
        private organizationRepository: Repository<Organization>,
    ) {}

    async getOrganizationById(
        organizationId: OrganizationId,
    ): Promise<Organization> {
        const organization = await this.organizationRepository.findOne({
            where: {
                id: organizationId,
            },
        });

        if (organization === null) {
            throw new OrganizationNotFoundException(organizationId);
        }

        return organization;
    }

    async getUserOrganizations(userId: UserId): Promise<Organization[]> {
        return await this.organizationRepository
            .createQueryBuilder('org')
            .innerJoin(
                Member,
                'm',
                'm.organizationId = org.id AND m.userId = :userId',
                { userId: userId },
            )
            .getMany();
    }

    async save(organization: Organization): Promise<Organization> {
        return await this.organizationRepository.save(organization);
    }

    async deleteOrganization(organizationId: OrganizationId) {
        await this.organizationRepository.manager.transaction(
            async (manager) => {
                await manager.delete(Member, {
                    organizationId: organizationId,
                });
                await manager.delete(Organization, {
                    id: organizationId,
                });
                await manager.delete(Invitation, {
                    organizationId: organizationId,
                });
            },
        );
    }
}
