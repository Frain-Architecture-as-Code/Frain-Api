import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Put,
    UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../../shared/infrastructure/security/auth.guard';
import { ApiKeyGuard } from '../../infrastructure/security/api-key.guard';
import { ProjectsService } from '../../application/services/projects.service';
import { ViewNotFoundException } from '../../domain/exceptions/view-not-found.exception';
import { ProjectId } from '../../domain/model/valueobjects/project-id';
import { C4ModelAssembler } from './assembler/c4-model.assembler';
import { C4ModelCommandAssembler } from './assembler/c4-model-command.assembler';
import { SetC4ModelRequest } from './requests/set-c4-model.request';
import { UpdateNodePositionRequest } from './requests/update-node-position.request';
import { C4ModelResponse } from './responses/c4-model.response';
import { ProjectDetailsResponse } from './responses/project-details.response';
import { ViewDetailResponse } from './responses/view-detail.response';
import { ViewSummaryResponse } from './responses/view-summary.response';

@ApiTags('C4 Model')
@Controller('/api/v1/c4models/projects/:projectId')
export class C4ModelController {
    constructor(private readonly projectsService: ProjectsService) {}

    /**
     * SDK endpoint - Updates the entire C4 model for a project.
     * Requires API Key authentication via Frain-Api-Key header.
     */
    @Put('/sdk')
    @UseGuards(ApiKeyGuard)
    async updateC4Model(
        @Param('projectId') projectId: string,
        @Body() body: SetC4ModelRequest,
    ): Promise<C4ModelResponse> {
        const command = C4ModelCommandAssembler.toSetC4ModelCommand(
            projectId,
            body,
        );

        await this.projectsService.setC4Model(command);

        const project = await this.projectsService.getProjectByIdRaw(
            ProjectId.fromString(projectId),
        );

        return C4ModelAssembler.toC4ModelResponse(project);
    }

    /**
     * Gets the full C4 model for a project.
     */
    @Get()
    @UseGuards(AuthGuard)
    async getC4Model(
        @Param('projectId') projectId: string,
    ): Promise<C4ModelResponse> {
        const project = await this.projectsService.getProjectByIdRaw(
            ProjectId.fromString(projectId),
        );

        return C4ModelAssembler.toC4ModelResponse(project);
    }

    /**
     * Gets project details (title, description, updatedAt).
     */
    @Get('/details')
    @UseGuards(AuthGuard)
    async getProjectDetails(
        @Param('projectId') projectId: string,
    ): Promise<ProjectDetailsResponse> {
        const project = await this.projectsService.getProjectByIdRaw(
            ProjectId.fromString(projectId),
        );

        return C4ModelAssembler.toProjectDetailsResponse(project);
    }

    /**
     * Gets view summaries (without nodes and relations).
     */
    @Get('/views')
    @UseGuards(AuthGuard)
    async getViewSummaries(
        @Param('projectId') projectId: string,
    ): Promise<ViewSummaryResponse[]> {
        const project = await this.projectsService.getProjectByIdRaw(
            ProjectId.fromString(projectId),
        );

        const summaries = project.getViewSummaries();

        return C4ModelAssembler.toViewSummaryResponseList(summaries);
    }

    /**
     * Gets full view detail including nodes and relations.
     */
    @Get('/views/:viewId')
    @UseGuards(AuthGuard)
    async getViewDetail(
        @Param('projectId') projectId: string,
        @Param('viewId') viewId: string,
    ): Promise<ViewDetailResponse> {
        const project = await this.projectsService.getProjectByIdRaw(
            ProjectId.fromString(projectId),
        );

        const view = project.getViewById(viewId);
        if (!view) {
            throw new ViewNotFoundException(viewId, projectId);
        }

        return C4ModelAssembler.toViewDetailResponse(view);
    }

    /**
     * Updates a node's position within a view.
     */
    @Patch('/views/:viewId/nodes/:nodeId')
    @UseGuards(AuthGuard)
    async updateNodePosition(
        @Param('projectId') projectId: string,
        @Param('viewId') viewId: string,
        @Param('nodeId') nodeId: string,
        @Body() body: UpdateNodePositionRequest,
    ): Promise<ViewDetailResponse> {
        const command = C4ModelCommandAssembler.toUpdateNodePositionCommand(
            projectId,
            viewId,
            nodeId,
            body,
        );

        await this.projectsService.updateNodePosition(command);

        // Return the updated view
        const project = await this.projectsService.getProjectByIdRaw(
            ProjectId.fromString(projectId),
        );

        const view = project.getViewById(viewId);
        if (!view) {
            throw new ViewNotFoundException(viewId, projectId);
        }

        return C4ModelAssembler.toViewDetailResponse(view);
    }
}
