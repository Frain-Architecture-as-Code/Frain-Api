import { Injectable, Logger } from '@nestjs/common';
import { Project } from '../../domain/model/project.entity';
import { ProjectNotFoundException } from '../../domain/exceptions/project-not-found.exceptions';
import { GetProjectsByOrganizationIdQuery } from '../../domain/model/queries/get-projects-by-organization-id.query';
import { GetProjectByIdQuery } from '../../domain/model/queries/get-project-by-id.query';
import { OrganizationContextAcl } from '../../../organizations/infrastructure/acl/organization-context.acl';
import { InsufficientPermissionException } from '../../../shared/domain/exceptions/insufficient-permission.exception';
import { CreateProjectCommand } from '../../domain/model/commands/create-project.command';
import { ProjectId } from '../../domain/model/valueobjects/project-id';
import { UserId } from '../../../shared/domain/model/valueobjects/user-id';
import { OrganizationId } from '../../domain/model/valueobjects/organization-id';
import { UpdateProjectCommand } from '../../domain/model/commands/update-project.command';
import { SetC4ModelCommand } from '../../domain/model/commands/set-c4-model.command';
import { UpdateNodePositionCommand } from '../../domain/model/commands/update-node-position.command';
import { ProjectRepository } from '../../infrastructure/persistence/repositories/project.repository';

@Injectable()
export class ProjectsService {
    private readonly logger = new Logger(ProjectsService.name);

    constructor(
        private projectRepository: ProjectRepository,
        private organizationContextAcl: OrganizationContextAcl,
    ) {}

    private async canUserAccessProject(
        userId: UserId,
        organizationId: OrganizationId,
    ) {
        const hasAccessToOrganization =
            await this.organizationContextAcl.hasAccessToOrganization(
                userId.toString(),
                organizationId.toString(),
            );

        if (!hasAccessToOrganization) {
            throw new InsufficientPermissionException(
                'User does not have access to the organization',
            );
        }
        return true;
    }

    async getProjectById(query: GetProjectByIdQuery): Promise<Project> {
        // TODO: we can add additional validation here
        await this.canUserAccessProject(query.user.id, query.organizationId);

        return this.projectRepository.findById(query.projectId);
    }

    async getProjectsByOrganizationId(
        query: GetProjectsByOrganizationIdQuery,
    ): Promise<Project[]> {
        await this.canUserAccessProject(query.user.id, query.organizationId);

        const projects = await this.projectRepository.findAllByOrganizationId(
            query.organizationId,
        );

        return projects;
    }

    async createProject(command: CreateProjectCommand): Promise<ProjectId> {
        const hasAccessToOrganization =
            await this.organizationContextAcl.canCreateProject(
                command.user.id.toString(),
                command.organizationId.toString(),
            );

        if (!hasAccessToOrganization) {
            throw new InsufficientPermissionException(
                'User cannot create a project in the organization',
            );
        }

        const projectId = ProjectId.generate();

        const project = Project.create({
            id: projectId,
            organizationId: command.organizationId,
            visibility: command.visiblity,
        });

        await this.projectRepository.save(project);

        return projectId;
    }

    async updateProject(command: UpdateProjectCommand): Promise<ProjectId> {
        const hasAccessToOrganization =
            await this.organizationContextAcl.canUpdateProject(
                command.user.id.toString(),
                command.organizationId.toString(),
            );

        if (!hasAccessToOrganization) {
            throw new InsufficientPermissionException(
                'User cannot update a project in the organization',
            );
        }

        const project = await this.projectRepository.findById(
            command.projectId,
        );

        if (!project) {
            throw new ProjectNotFoundException(command.projectId);
        }

        project.update({
            visibility: command.visibility,
        });

        await this.projectRepository.save(project);

        return project.id;
    }

    /**
     * Gets a project by ID without organization/permission checks.
     * Used by C4 model endpoints that authenticate via API Key.
     */
    async getProjectByIdRaw(projectId: ProjectId): Promise<Project> {
        const project = await this.projectRepository.findById(projectId);

        if (project === null) {
            throw new ProjectNotFoundException(projectId);
        }

        return project;
    }

    /**
     * Sets/replaces the entire C4 model for a project.
     * Used by the SDK endpoint.
     */
    async setC4Model(command: SetC4ModelCommand): Promise<ProjectId> {
        const project = await this.projectRepository.findById(
            command.projectId,
        );

        if (!project) {
            throw new ProjectNotFoundException(command.projectId);
        }

        project.updateC4Model(command.c4Model);
        await this.projectRepository.save(project);

        this.logger.log(
            `Updated C4Model for project: ${command.projectId.toString()}`,
        );

        return project.id;
    }

    /**
     * Updates a node's position within a view.
     */
    async updateNodePosition(
        command: UpdateNodePositionCommand,
    ): Promise<void> {
        const project = await this.projectRepository.findById(
            command.projectId,
        );

        if (!project) {
            throw new ProjectNotFoundException(command.projectId);
        }

        project.updateNodePosition(
            command.viewId,
            command.nodeId,
            command.x,
            command.y,
        );
        await this.projectRepository.save(project);

        this.logger.log(
            `Updated node ${command.nodeId} position in view ${command.viewId} for project: ${command.projectId.toString()}`,
        );
    }
}
