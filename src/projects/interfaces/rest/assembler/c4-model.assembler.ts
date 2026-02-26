import { Project, ViewSummary } from '../../../domain/model/project.entity';
import { C4View } from '../../../domain/model/valueobjects/c4-view';
import { C4ModelResponse } from '../responses/c4-model.response';
import { ProjectDetailsResponse } from '../responses/project-details.response';
import { ViewDetailResponse } from '../responses/view-detail.response';
import { ViewSummaryResponse } from '../responses/view-summary.response';

export class C4ModelAssembler {
    static toC4ModelResponse(project: Project): C4ModelResponse {
        return {
            projectId: project.id.toString(),
            c4Model: project.c4Model,
        };
    }

    static toProjectDetailsResponse(project: Project): ProjectDetailsResponse {
        if (!project.c4Model) {
            return {
                title: 'Untitled Project',
                description:
                    'No description available. Use the SDK to set the C4 model.',
                updatedAt: project.updatedAt.toISOString(),
            };
        }

        return {
            title: project.c4Model.title,
            description: project.c4Model.description,
            updatedAt: project.updatedAt.toISOString(),
        };
    }

    static toViewSummaryResponseList(
        summaries: ViewSummary[],
    ): ViewSummaryResponse[] {
        return summaries.map((vs) => ({
            id: vs.id,
            type: vs.type,
            name: vs.name,
            container: vs.container,
        }));
    }

    static toViewDetailResponse(view: C4View): ViewDetailResponse {
        return {
            id: view.id,
            type: view.type,
            name: view.name,
            container: view.container,
            nodes: view.nodes,
            externalNodes: view.externalNodes,
            relations: view.relations,
        };
    }
}
