import { ProjectApiKeyId } from '../valueobjects/project-api-key-id';

export class GetProjectApiKeyByIdQuery {
    constructor(public readonly id: ProjectApiKeyId) {}
}
