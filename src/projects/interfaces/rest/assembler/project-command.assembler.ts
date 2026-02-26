import { User } from '../../../../shared/domain/model/user';
import { CreateProjectCommand } from '../../../domain/model/commands/create-project.command';
import { UpdateProjectCommand } from '../../../domain/model/commands/update-project.command';
import { OrganizationId } from '../../../domain/model/valueobjects/organization-id';
import { ProjectId } from '../../../domain/model/valueobjects/project-id';
import { CreateProjectRequest } from '../requests/create-project.request';
import { UpdateProjectRequest } from '../requests/update-project.request';

export class ProjectCommandAssembler {
    static toCreateProjectCommand(
        organizationId: string,
        user: User,
        body: CreateProjectRequest,
    ): CreateProjectCommand {
        return new CreateProjectCommand(
            OrganizationId.fromString(organizationId),
            user,
            body.visibility,
        );
    }

    static toUpdateProjectCommand(
        organizationId: string,
        projectId: string,
        user: User,
        body: UpdateProjectRequest,
    ): UpdateProjectCommand {
        return new UpdateProjectCommand(
            OrganizationId.fromString(organizationId),
            ProjectId.fromString(projectId),
            user,
            body.visibility,
        );
    }
}
