import { ProjectId } from '../valueobjects/project-id';

export class UpdateNodePositionCommand {
    constructor(
        public readonly projectId: ProjectId,
        public readonly viewId: string,
        public readonly nodeId: string,
        public readonly x: number,
        public readonly y: number,
    ) {}
}
