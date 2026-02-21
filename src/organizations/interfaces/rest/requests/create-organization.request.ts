import { createZodDto } from 'nestjs-zod';
import { OrganizationVisibility } from 'src/organizations/domain/model/valueobjects/organization-visibility';
import z from 'zod';

const createOrganizationRequestSchema = z.object({
  name: z.string().min(2).max(100),
  visibility: z.enum(OrganizationVisibility),
});

export class CreateOrganizationRequest extends createZodDto(
  createOrganizationRequestSchema,
) {}
