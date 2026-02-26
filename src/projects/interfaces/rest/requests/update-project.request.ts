import z from 'zod';
import { ProjectVisibility } from '../../../domain/model/valueobjects/project-visibility';
import { createZodDto } from 'nestjs-zod';

const updateProjectRequestSchema = z.object({
    visibility: z.enum(ProjectVisibility),
});

export class UpdateProjectRequest extends createZodDto(
    updateProjectRequestSchema,
) {}
