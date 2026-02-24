import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ProjectResponse } from './responses/project.response';
import { AuthGuard } from '../../../shared/infrastructure/security/auth.guard';
import { ProjectsService } from '../../application/services/projects.service';
import { UserContext } from '../../../shared/infrastructure/security/user-context';
import { ProjectQueryAssembler } from './assembler/project-query.assembler';
import { ProjectAssembler } from './assembler/project.assembler';

@UseGuards(AuthGuard)
@Controller('/api/v1/organizations/:organizationId/projects')
export class ProjectsController {
    constructor(
        private projectService: ProjectsService,
        private userContext: UserContext,
    ) {}

    @Get()
    async getProjects(
        @Param('organizationId') organizationId: string,
    ): Promise<ProjectResponse[]> {
        const user = this.userContext.user;

        const query = ProjectQueryAssembler.toGetProjectsByOrganizationIdQuery(
            organizationId,
            user,
        );

        const result =
            await this.projectService.getProjectsByOrganizationId(query);

        const response = ProjectAssembler.toResponseListFromEntities(result);

        return response;
    }
}
