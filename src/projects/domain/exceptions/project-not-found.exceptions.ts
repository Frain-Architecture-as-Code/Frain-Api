import { NotFoundException } from '@nestjs/common';
import { ProjectId } from '../model/valueobjects/project-id';

export class ProjectNotFoundException extends NotFoundException {
    constructor(projectId: ProjectId) {
        super(`Project with id ${projectId.toString()} not found`);
    }
}
