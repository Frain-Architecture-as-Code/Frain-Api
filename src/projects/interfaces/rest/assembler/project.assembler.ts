import { Project } from '../../../domain/model/project.entity';
import { ProjectResponse } from '../responses/project.response';

export class ProjectAssembler {
    static toResponseFromEntity(project: Project): ProjectResponse {
        return {
            projectId: project.id.toString(),
        };
    }
}
