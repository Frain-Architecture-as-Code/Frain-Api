import { NotFoundException } from '@nestjs/common';

export class ViewNotFoundException extends NotFoundException {
    constructor(viewId: string, projectId?: string) {
        const message = projectId
            ? `View '${viewId}' not found in project: ${projectId}`
            : `View not found: ${viewId}`;
        super(message);
    }
}
