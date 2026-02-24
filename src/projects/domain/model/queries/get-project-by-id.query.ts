import { ProjectId } from '../valueobjects/project-id';

export class GetProjectByIdQuery {
    constructor(public readonly projectId: ProjectId) {}
}
