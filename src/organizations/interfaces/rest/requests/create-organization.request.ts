import { createZodDto } from 'nestjs-zod';
import { OrganizationVisibility } from '../../../domain/model/valueobjects/organization-visibility';
import z from 'zod';

const createOrganizationRequestSchema = z.object({
    name: z.string(),
    visibility: z.enum(OrganizationVisibility),
});

export class CreateOrganizationRequest extends createZodDto(
    createOrganizationRequestSchema,
) {}
