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
        @Param(':organizationId') organizationId: string,
        @Param(':projectId') projectId: string,
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
        @Param(':organizationId') organizationId: string,
        @Param(':projectId') projectId: string,
        @Body() request: CreateProjectApiKeyRequest,
    ) {}

    @Delete()
    async revokeApiKey(
        @Param(':organizationId') organizationId: string,
        @Param(':projectId') projectId: string,
    ) {}
}
