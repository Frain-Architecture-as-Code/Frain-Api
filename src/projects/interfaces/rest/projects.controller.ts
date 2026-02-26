import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import { ProjectResponse } from './responses/project.response';
import { AuthGuard } from '../../../shared/infrastructure/security/auth.guard';
import { ProjectsService } from '../../application/services/projects.service';
import { UserContext } from '../../../shared/infrastructure/security/user-context';
import { ProjectQueryAssembler } from './assembler/project-query.assembler';
import { ProjectAssembler } from './assembler/project.assembler';
import { CreateProjectRequest } from './requests/create-project.request';
import { ProjectCommandAssembler } from './assembler/project-command.assembler';
import { UpdateProjectRequest } from './requests/update-project.request';

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

    @Post()
    async createProject(
        @Param('organizationId') organizationId: string,
        @Body() body: CreateProjectRequest,
    ): Promise<ProjectResponse> {
        const user = this.userContext.user;

        const command = ProjectCommandAssembler.toCreateProjectCommand(
            organizationId,
            user,
            body,
        );

        const projectId = await this.projectService.createProject(command);

        const query = ProjectQueryAssembler.toGetProjectByIdQuery(
            organizationId,
            projectId.toString(),
            user,
        );

        const result = await this.projectService.getProjectById(query);

        const response = ProjectAssembler.toResponseFromEntity(result);

        return response;
    }

    @Patch('/:projectId')
    async updateProject(
        @Param('organizationId') organizationId: string,
        @Param('projectId') projectId: string,
        @Body() body: UpdateProjectRequest,
    ): Promise<ProjectResponse> {
        const user = this.userContext.user;

        const command = ProjectCommandAssembler.toUpdateProjectCommand(
            organizationId,
            projectId,
            user,
            body,
        );

        await this.projectService.updateProject(command);

        const query = ProjectQueryAssembler.toGetProjectByIdQuery(
            organizationId,
            projectId,
            user,
        );

        const result = await this.projectService.getProjectById(query);

        const response = ProjectAssembler.toResponseFromEntity(result);

        return response;
    }
}
