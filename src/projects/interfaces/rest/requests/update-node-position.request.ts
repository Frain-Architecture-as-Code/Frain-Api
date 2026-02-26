import z from 'zod';
import { createZodDto } from 'nestjs-zod';

const updateNodePositionRequestSchema = z.object({
    x: z.number({ message: 'X coordinate is required' }),
    y: z.number({ message: 'Y coordinate is required' }),
});

export class UpdateNodePositionRequest extends createZodDto(
    updateNodePositionRequestSchema,
) {}
