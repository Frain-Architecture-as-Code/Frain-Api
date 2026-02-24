import z from 'zod';
import { ProjectVisibility } from '../../../domain/model/valueobjects/project-visibility';
import { createZodDto } from 'nestjs-zod';

const createProjectRequestSchema = z.object({
    visibility: z.enum(ProjectVisibility),
});
export class CreateProjectRequest extends createZodDto(
    createProjectRequestSchema,
) {}
