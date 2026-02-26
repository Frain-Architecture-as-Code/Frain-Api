import { ProjectApiKeyId } from '../../../domain/model/valueobjects/project-api-key-id';
import { RevokeApiKeyResponse } from '../responses/revoke-api-key.response';

export class ProjectApiKeyResponseAssembler {
    static toRevokeProjectApiKeyResponse(
        projectApiKeyId: ProjectApiKeyId,
    ): RevokeApiKeyResponse {
        return {
            id: projectApiKeyId.toString(),
        };
    }
}
