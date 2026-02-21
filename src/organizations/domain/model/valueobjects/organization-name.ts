import z from 'zod';
import { createZodDto } from 'nestjs-zod';

enum OrganizationNameConstrains {
  MIN_LENGTH = 3,
  MAX_LENGTH = 100,
}

const organizationNameSchema = z.object({
  value: z
    .string()
    .min(OrganizationNameConstrains.MIN_LENGTH)
    .max(OrganizationNameConstrains.MAX_LENGTH),
});

export class OrganizationName extends createZodDto(organizationNameSchema) {
  public static MIN_LENGTH = OrganizationNameConstrains.MIN_LENGTH;
  public static MAX_LENGTH = OrganizationNameConstrains.MAX_LENGTH;
}
