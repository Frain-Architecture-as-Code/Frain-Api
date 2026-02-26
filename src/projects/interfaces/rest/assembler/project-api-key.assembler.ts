import { ProjectApiKey } from '../../../domain/model/project-api-key.entity';
import { ProjectApiKeyResponse } from '../responses/project-api-key.response';

export class ProjectApiKeyAssembler {
    static toResponseFromEntity(
        projectApiKey: ProjectApiKey,
    ): ProjectApiKeyResponse {
        return {
            id: projectApiKey.id.toString(),
            projectId: projectApiKey.projectId.toString(),
            apiKeySecret: projectApiKey.apiKeySecret.toString(),
            lastUsedAt: projectApiKey.lastUsedAt,
            memberId: projectApiKey.memberId.toString(),
            createdAt: projectApiKey.createdAt,
            updatedAt: projectApiKey.updatedAt,
        };
    }

    static toResponseListFromEntities(
        apiKeys: ProjectApiKey[],
    ): ProjectApiKeyResponse[] {
        return apiKeys.map((apikey) => this.toResponseFromEntity(apikey));
    }
}
