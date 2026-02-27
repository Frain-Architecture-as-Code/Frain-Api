import { Injectable, Logger } from '@nestjs/common';
import { CreateOrganizationCommand } from '../../domain/model/commands/create-organization.command';
import { OrganizationId } from '../../domain/model/valueobjects/organization-id';
import { Organization } from '../../domain/model/organization.entity';
import { MemberId } from '../../domain/model/valueobjects/member-id';
import { GetOrganizationByIdQuery } from '../../domain/model/queries/get-organization-by-id.query';
import { Member } from '../../domain/model/member.entity';
import { MemberName } from '../../domain/model/valueobjects/member-name';
import { DeleteOrganizationCommand } from '../../domain/model/commands/delete-organization.command';
import { InsufficientPermissionException } from '../../../shared/domain/exceptions/insufficient-permission.exception';
import { UpdateOrganizationCommand } from '../../domain/model/commands/update-organization.command';
import { MemberService } from './member.service';
import { OrganizationNotFoundException } from '../../domain/exceptions/organization-not-found.exception';
import { MemberRole } from '../../domain/model/valueobjects/member-role';
import { OrganizationRepository } from '../../infrastructure/persistence/organization.repository';
import { GetUserOrganizationsQuery } from '../../domain/model/queries/get-user-organizations.query';
import { MemberRepository } from '../../infrastructure/persistence/member.repository';

@Injectable()
export class OrganizationsService {
    private logger = new Logger(OrganizationsService.name);

    constructor(
        private organizationRepository: OrganizationRepository,
        private memberRepository: MemberRepository,
        private memberService: MemberService,
    ) {}

    async getUserOrganizations(query: GetUserOrganizationsQuery) {
        return await this.organizationRepository.getUserOrganizations(
            query.userId,
        );
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

        const member = Member.create({
            memberId: memberId,
            userId: command.currentUser.id,
            organizationId: organizationId,
            name: MemberName.fromString(
                command.currentUser.username.toString(),
            ),
            picture: command.currentUser.picture,
            role: MemberRole.OWNER,
        });

        await this.organizationRepository.save(organization);
        await this.memberRepository.save(member);

        this.logger.log(
            `Organization created with id ${organizationId.toString()}`,
        );
        return organizationId;
    }

    async getById(query: GetOrganizationByIdQuery): Promise<Organization> {
        const organization =
            await this.organizationRepository.getOrganizationById(
                query.organizationId,
            );

        if (organization === null) {
            throw new OrganizationNotFoundException(query.organizationId);
        }

        return organization;
    }

    async deleteOrganization(
        command: DeleteOrganizationCommand,
    ): Promise<OrganizationId> {
        const currentMember =
            await this.memberService.getMemberByUserIdAndOrganizationId({
                userId: command.userId,
                organizationId: command.organizationId,
            });

        if (!currentMember.isOwner()) {
            throw new InsufficientPermissionException(
                'Only the owner can delete the organization',
            );
        }

        this.logger.log(
            `Deleting organization with id ${command.organizationId.toString()}. Performed by ${command.userId.toString()}`,
        );

        await this.organizationRepository.deleteOrganization(
            command.organizationId,
        );

        return command.organizationId;
    }

    async updateOrganization(
        command: UpdateOrganizationCommand,
    ): Promise<Organization> {
        const requestingMember =
            await this.memberService.getMemberByUserIdAndOrganizationId({
                userId: command.userId,
                organizationId: command.organizationId,
            });

        if (!requestingMember.isOwner()) {
            throw new InsufficientPermissionException(
                'Only the owner can update the organization',
            );
        }

        const organization = await this.getById({
            organizationId: command.organizationId,
        });

        const result = organization.update({
            name: command.name,
            visibility: command.visibility,
        });

        await this.organizationRepository.save(result);

        this.logger.log(
            `Organization with id ${command.organizationId.toString()} updated`,
        );

        return organization;
    }
}
