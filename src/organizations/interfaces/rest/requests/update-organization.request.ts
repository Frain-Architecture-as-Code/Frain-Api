import { createZodDto } from 'nestjs-zod';
import { OrganizationVisibility } from 'src/organizations/domain/model/valueobjects/organization-visibility';
import z from 'zod';

const updateOrganizationRequestSchema = z.object({
    name: z.string(),
    visibility: z.enum(OrganizationVisibility),
});

export class UpdateOrganizationRequest extends createZodDto(
    updateOrganizationRequestSchema,
) {}
