import { createZodDto } from 'nestjs-zod';
import z from 'zod';

const createProjectApiKeySchema = z.object({
    targetMemberId: z.string(),
});

export class CreateProjectApiKeyRequest extends createZodDto(
    createProjectApiKeySchema,
) {}
