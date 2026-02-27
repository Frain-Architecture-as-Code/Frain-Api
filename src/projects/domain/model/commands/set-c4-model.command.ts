import { C4Model } from '../valueobjects/c4-model';
import { ProjectId } from '../valueobjects/project-id';

export class SetC4ModelCommand {
    constructor(
        public readonly projectId: ProjectId,
        public readonly c4Model: C4Model,
    ) {}
}
