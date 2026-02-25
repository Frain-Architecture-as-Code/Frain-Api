import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../../../shared/infrastructure/security/auth.guard';
import { UserContext } from '../../../shared/infrastructure/security/user-context';
import { ProjectApiKeyResponse } from './responses/project-api-key.response';
import { ProjectApiKeyQueryAssembler } from './assembler/project-api-key-query.assembler';
import { ProjectApiKeysService } from '../../application/services/project-api-keys.service';
import { ProjectApiKeyAssembler } from './assembler/project-api-key.assembler';
import { CreateProjectApiKeyRequest } from './requests/create-project-api-key.request';
import { ProjectApiKeyCommandAssembler } from './assembler/project-api-key-command.assembler';
import { RevokeApiKeyResponse } from './responses/revoke-api-key.response';
import { ProjectApiKeyResponseAssembler } from './assembler/project-api.key-response.assembler';

@UseGuards(AuthGuard)
@Controller(
    '/api/v1/organizations/:organizationId/projects/:projectId/api-keys',
)
export class ProjectApiKeysController {
    constructor(
        private projectApiKeysService: ProjectApiKeysService,
        private userContext: UserContext,
    ) {}

    @Get()
    async getProjectApiKeys(
        @Param('organizationId') organizationId: string,
        @Param('projectId') projectId: string,
    ): Promise<ProjectApiKeyResponse[]> {
        const user = this.userContext.user;

        const query = ProjectApiKeyQueryAssembler.toGetApiKeysQuery(
            organizationId,
            projectId,
            user,
        );

        const apikeys =
            await this.projectApiKeysService.getProjectApiKeys(query);

        const response =
            ProjectApiKeyAssembler.toResponseListFromEntities(apikeys);

        return response;
    }

    @Post()
    async createApiKey(
        @Param('organizationId') organizationId: string,
        @Param('projectId') projectId: string,
        @Body() request: CreateProjectApiKeyRequest,
    ): Promise<ProjectApiKeyResponse> {
        const user = this.userContext.user;

        const command =
            ProjectApiKeyCommandAssembler.toCreateProjectApiKeyCommand(
                organizationId,
                projectId,
                user,
                request,
            );

        const apiKey =
            await this.projectApiKeysService.createProjectApiKey(command);

        const response = ProjectApiKeyAssembler.toResponseFromEntity(apiKey);

        return response;
    }

    @Delete('/:projectApiKeyId')
    async revokeApiKey(
        @Param('organizationId') organizationId: string,
        @Param('projectId') projectId: string,
        @Param('projectApiKeyId') projectApiKeyId: string,
    ): Promise<RevokeApiKeyResponse> {
        const user = this.userContext.user;

        const command =
            ProjectApiKeyCommandAssembler.toRevokeProjectApiKeyCommand(
                organizationId,
                projectId,
                projectApiKeyId,
                user,
            );

        const result =
            await this.projectApiKeysService.revokeProjectApiKey(command);

        const response =
            ProjectApiKeyResponseAssembler.toRevokeProjectApiKeyResponse(
                result,
            );

        return response;
    }
}
