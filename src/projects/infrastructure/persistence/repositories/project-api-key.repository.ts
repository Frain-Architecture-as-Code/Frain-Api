import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectApiKey } from '../../../domain/model/project-api-key.entity';
import { Repository } from 'typeorm';
import { ProjectApiKeyId } from '../../../domain/model/valueobjects/project-api-key-id';
import { ProjectApiKeyNotFoundException } from '../../../domain/exceptions/project-api-key-not-found.exception';
import { ProjectId } from '../../../domain/model/valueobjects/project-id';

@Injectable()
export class ProjectApiKeyRepository {
    constructor(
        @InjectRepository(ProjectApiKey)
        private readonly projectApiKeyRepository: Repository<ProjectApiKey>,
    ) {}

    async findById(id: ProjectApiKeyId): Promise<ProjectApiKey> {
        const projectApiKey = await this.projectApiKeyRepository.findOne({
            where: {
                id,
            },
        });
        if (!projectApiKey) {
            throw new ProjectApiKeyNotFoundException(id);
        }
        return projectApiKey;
    }

    async findAllByProjectId(projectId: ProjectId): Promise<ProjectApiKey[]> {
        return this.projectApiKeyRepository.find({
            where: {
                projectId,
            },
        });
    }

    async save(projectApiKey: ProjectApiKey): Promise<ProjectApiKey> {
        return this.projectApiKeyRepository.save(projectApiKey);
    }

    async delete(projectApiKey: ProjectApiKey): Promise<void> {
        await this.projectApiKeyRepository.remove(projectApiKey);
    }
}
