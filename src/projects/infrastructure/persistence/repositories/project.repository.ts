import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../../../domain/model/project.entity';
import { ProjectId } from '../../../domain/model/valueobjects/project-id';
import { ProjectNotFoundException } from '../../../domain/exceptions/project-not-found.exceptions';
import { OrganizationId } from '../../../domain/model/valueobjects/organization-id';

@Injectable()
export class ProjectRepository {
    constructor(
        @InjectRepository(Project)
        private readonly projectRepository: Repository<Project>,
    ) {}

    async findById(id: ProjectId): Promise<Project> {
        const project = await this.projectRepository.findOne({
            where: { id },
        });

        if (!project) {
            throw new ProjectNotFoundException(id);
        }

        return project;
    }

    async findAllByOrganizationId(
        organizationId: OrganizationId,
    ): Promise<Project[]> {
        return await this.projectRepository.find({
            where: { organizationId },
        });
    }

    async save(project: Project): Promise<Project> {
        return await this.projectRepository.save(project);
    }
}
