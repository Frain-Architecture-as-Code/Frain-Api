import { Injectable } from '@nestjs/common';
import { Project } from '../../domain/model/project.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
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

@Injectable()
export class ProjectsService {
    constructor(
        @InjectRepository(Project)
        private projectRepository: Repository<Project>,
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

        const project = await this.projectRepository.findOne({
            where: {
                id: query.projectId,
            },
        });

        if (project === null) {
            throw new ProjectNotFoundException(query.projectId);
        }

        return project;
    }

    async getProjectsByOrganizationId(
        query: GetProjectsByOrganizationIdQuery,
    ): Promise<Project[]> {
        await this.canUserAccessProject(query.user.id, query.organizationId);

        const projects = await this.projectRepository.find({
            where: {
                organizationId: query.organizationId,
            },
        });

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
            await this.organizationContextAcl.canCreateProject(
                command.user.id.toString(),
                command.organizationId.toString(),
            );

        if (!hasAccessToOrganization) {
            throw new InsufficientPermissionException(
                'User cannot update a project in the organization',
            );
        }

        const project = await this.projectRepository.findOne({
            where: {
                id: command.projectId,
                organizationId: command.organizationId,
            },
        });

        if (!project) {
            throw new ProjectNotFoundException(command.projectId);
        }

        project.update({
            visibility: command.visibility,
        });

        await this.projectRepository.save(project);

        return project.id;
    }
}
