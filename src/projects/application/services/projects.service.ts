import { Injectable } from '@nestjs/common';
import { Project } from '../../domain/model/project.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectNotFoundException } from '../../domain/exceptions/project-not-found.exceptions';
import { GetProjectsByOrganizationIdQuery } from '../../domain/model/queries/get-projects-by-organization-id.query';
import { GetProjectByIdQuery } from '../../domain/model/queries/get-project-by-id.query';
import { OrganizationContextAcl } from '../../../organizations/infrastructure/acl/organization-context.acl';
import { InsufficientPermissionException } from '../../../shared/domain/exceptions/insufficient-permission.exception';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectRepository(Project)
        private projectRepository: Repository<Project>,
        private organizationContextAcl: OrganizationContextAcl,
    ) {}

    async getProjectById(query: GetProjectByIdQuery): Promise<Project> {
        // TODO: we can add additional validation here
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
        const hasAccessToOrganization =
            await this.organizationContextAcl.hasAccessToOrganization(
                query.user.id.toString(),
                query.organizationId.toString(),
            );

        if (!hasAccessToOrganization) {
            throw new InsufficientPermissionException(
                'User does not have access to the organization',
            );
        }

        const projects = await this.projectRepository.find({
            where: {
                organizationId: query.organizationId,
            },
        });

        return projects;
    }
}
