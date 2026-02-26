import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
    Logger,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';
import { ProjectApiKey } from '../../domain/model/project-api-key.entity';
import { ApiKeySecret } from '../../domain/model/valueobjects/api-key-secret';
import { ProjectId } from '../../domain/model/valueobjects/project-id';

export const API_KEY_HEADER = 'Frain-Api-Key';

export interface ApiKeyContext {
    projectId: ProjectId;
    memberId: string;
    apiKeyId: string;
}

@Injectable()
export class ApiKeyGuard implements CanActivate {
    private readonly logger = new Logger(ApiKeyGuard.name);

    constructor(
        @InjectRepository(ProjectApiKey)
        private readonly projectApiKeyRepository: Repository<ProjectApiKey>,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<Request>();
        const rawHeader = request.headers[API_KEY_HEADER.toLowerCase()];
        const apiKeyHeader = Array.isArray(rawHeader)
            ? rawHeader[0]
            : rawHeader;

        if (!apiKeyHeader || apiKeyHeader.trim() === '') {
            this.logger.debug(
                `No API key header found for SDK endpoint: ${request.url} - Looking for ${API_KEY_HEADER} header`,
            );
            throw new UnauthorizedException('Missing Frain-Api-Key header');
        }

        // Validate the API key format
        let apiKeySecret: ApiKeySecret;
        try {
            apiKeySecret = ApiKeySecret.fromString(apiKeyHeader);
        } catch {
            this.logger.warn(
                `Invalid API key format attempted: ${apiKeyHeader.substring(0, Math.min(12, apiKeyHeader.length))}...`,
            );
            throw new UnauthorizedException('Invalid API key');
        }

        // Query the database for the API key
        const projectApiKey = await this.projectApiKeyRepository.findOne({
            where: { apiKeySecret: apiKeySecret },
        });

        if (!projectApiKey) {
            this.logger.warn(
                `Invalid API key attempted: ${apiKeyHeader.substring(0, Math.min(12, apiKeyHeader.length))}...`,
            );
            throw new UnauthorizedException('Invalid API key');
        }

        // Validate the API key matches the project in the route
        const pathProjectId = request.params['projectId'] as string;
        if (pathProjectId) {
            const routeProjectId = ProjectId.fromString(pathProjectId);
            if (
                projectApiKey.projectId.toString() !== routeProjectId.toString()
            ) {
                this.logger.warn(
                    `API key project mismatch. Path: ${pathProjectId}, API Key project: ${projectApiKey.projectId.toString()}`,
                );
                throw new ForbiddenException(
                    'API key not authorized for this project',
                );
            }
        }

        // Record API key usage (fire and forget)
        this.recordUsage(projectApiKey).catch(() => {
            this.logger.warn(
                `Failed to record API key usage for key ${projectApiKey.id.toString()}`,
            );
        });

        this.logger.debug(
            `API key authentication successful for project: ${projectApiKey.projectId.toString()}`,
        );

        return true;
    }

    private async recordUsage(projectApiKey: ProjectApiKey): Promise<void> {
        projectApiKey.lastUsedAt = new Date();
        await this.projectApiKeyRepository.save(projectApiKey);
    }
}
