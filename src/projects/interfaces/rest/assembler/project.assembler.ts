import { Project } from '../../../domain/model/project.entity';
import { ProjectResponse } from '../responses/project.response';

export class ProjectAssembler {
    static toResponseFromEntity(project: Project): ProjectResponse {
        return {
            projectId: project.id.toString(),
            createdAt: project.createdAt,
            organizationId: project.organizationId.toString(),
            updatedAt: project.updatedAt,
            visibility: project.visibility.toString(),
        };
    }

    static toResponseListFromEntities(projects: Project[]): ProjectResponse[] {
        return projects.map((pr) => ProjectAssembler.toResponseFromEntity(pr));
    }
}
