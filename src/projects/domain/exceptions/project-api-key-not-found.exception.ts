import { NotFoundException } from '@nestjs/common';
import { ProjectApiKeyId } from '../model/valueobjects/project-api-key-id';

export class ProjectApiKeyNotFoundException extends NotFoundException {
    constructor(id: ProjectApiKeyId) {
        super(`Project API key with ID ${id.toString()} not found`);
    }
}
