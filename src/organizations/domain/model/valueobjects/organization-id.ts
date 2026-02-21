import { createZodDto } from 'nestjs-zod';
import z, { uuid } from 'zod';

const organizationIdSchema = z.object({
  value: z.uuid(),
});

export class OrganizationId extends createZodDto(organizationIdSchema) {
  public static generate() {
    return OrganizationId.schema.parse({ value: crypto.randomUUID() });
  }
}
