import { Injectable, NotFoundException } from '@nestjs/common';
import { GetApiKeysQuery as GetProjectApiKeysQuery } from '../../domain/model/queries/get-project-api-keys.query';
import { ProjectApiKey } from '../../domain/model/project-api-key.entity';
import { OrganizationContextAcl } from '../../../organizations/infrastructure/acl/organization-context.acl';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MemberRole } from '../../../organizations/domain/model/valueobjects/member-role';
import { MemberId } from '../../domain/model/valueobjects/member-id';
import { CreateProjectApiKeyCommand } from '../../domain/model/commands/create-project-api-key.command';
import { InsufficientPermissionException } from '../../../shared/domain/exceptions/insufficient-permission.exception';
import { ProjectApiKeyId } from '../../domain/model/valueobjects/project-api-key-id';
import { ApiKeySecret } from '../../domain/model/valueobjects/api-key-secret';
import { RevokeProjectApiKeyCommand } from '../../domain/model/commands/revoke-project-api-key.command';
import { GetProjectApiKeyByIdQuery } from '../../domain/model/queries/get-project-api-key-by-id.query';
import { ProjectApiKeyNotFoundException } from '../../domain/exceptions/project-api-key-not-found.exception';

@Injectable()
export class ProjectApiKeysService {
    constructor(
        @InjectRepository(ProjectApiKey)
        private projectApiKeyRepository: Repository<ProjectApiKey>,
        private readonly organizationContextAcl: OrganizationContextAcl,
    ) {}

    async getProjectApiKeys(
        query: GetProjectApiKeysQuery,
    ): Promise<ProjectApiKey[]> {
        const [memberRole, memberIdRaw] = await Promise.all([
            this.organizationContextAcl.getMemberRoleByUserIdAndOrganizationId(
                query.user.id.toString(),
                query.organizationId.toString(),
            ),
            this.organizationContextAcl.getMemberIdByUserIdAndOrganizationId(
                query.user.id.toString(),
                query.organizationId.toString(),
            ),
        ]);

        const currentMemberId = MemberId.fromString(memberIdRaw);

        const projectApiKeys = await this.projectApiKeyRepository.find({
            where: { projectId: query.projectId },
        });

        if (
            memberRole === MemberRole.ADMIN ||
            memberRole === MemberRole.OWNER
        ) {
            return projectApiKeys.map((key) =>
                key.memberId.equals(currentMemberId) ? key : key.hideSecret(),
            );
        }

        if (memberRole === MemberRole.CONTRIBUTOR) {
            return projectApiKeys.filter((key) =>
                key.memberId.equals(currentMemberId),
            );
        }

        return [];
    }

    async createProjectApiKey(
        command: CreateProjectApiKeyCommand,
    ): Promise<ProjectApiKey> {
        const [currentMemberRole, existsTargetMember] = await Promise.all([
            this.organizationContextAcl.getMemberRoleByUserIdAndOrganizationId(
                command.user.id.toString(),
                command.organizationId.toString(),
            ),
            this.organizationContextAcl.existsMemberInOrganization(
                command.memberId.toString(),
                command.organizationId.toString(),
            ),
        ]);

        if (!existsTargetMember) {
            throw new NotFoundException('Member not found');
        }

        if (currentMemberRole === MemberRole.CONTRIBUTOR) {
            throw new InsufficientPermissionException(
                'User does not have sufficient permissions to create a project API key.',
            );
        }
        const projectApiKeyId = ProjectApiKeyId.generate();

        const apiKey = ProjectApiKey.create({
            id: projectApiKeyId,
            apiKeySecret: ApiKeySecret.generate(),
            memberId: command.memberId,
            projectId: command.projectId,
        });
        return apiKey;
    }

    async getProjectApiKeyById(
        query: GetProjectApiKeyByIdQuery,
    ): Promise<ProjectApiKey> {
        const apiKey = await this.projectApiKeyRepository.findOneBy({
            id: query.id,
        });

        if (!apiKey) {
            throw new NotFoundException('API key not found');
        }

        return apiKey;
    }

    async revokeProjectApiKey(
        command: RevokeProjectApiKeyCommand,
    ): Promise<ProjectApiKeyId> {
        // this also validates if the user is part of the organization
        const currentMemberRole =
            await this.organizationContextAcl.getMemberRoleByUserIdAndOrganizationId(
                command.user.id.toString(),
                command.organizationId.toString(),
            );

        if (currentMemberRole === MemberRole.CONTRIBUTOR) {
            throw new InsufficientPermissionException(
                'User does not have sufficient permissions to revoke a project API key.',
            );
        }

        const projectApiKey = await this.projectApiKeyRepository.findOne({
            where: {
                id: command.projectApiKeyId,
                projectId: command.projectId,
            },
        });

        if (!projectApiKey) {
            throw new ProjectApiKeyNotFoundException(command.projectApiKeyId);
        }

        const targetMemberRole =
            await this.organizationContextAcl.getMemberRoleByMemberId(
                projectApiKey.memberId.toString(),
            );

        if (
            targetMemberRole === MemberRole.OWNER &&
            currentMemberRole !== MemberRole.OWNER
        ) {
            throw new InsufficientPermissionException(
                'User does not have sufficient permissions to revoke a project API key from the owner.',
            );
        }

        if (
            targetMemberRole === MemberRole.ADMIN &&
            currentMemberRole === MemberRole.ADMIN
        ) {
            throw new InsufficientPermissionException(
                'User does not have sufficient permissions to revoke a project API key from an admin.',
            );
        }

        await this.projectApiKeyRepository.remove(projectApiKey);

        return projectApiKey.id;
    }
}
