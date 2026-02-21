import { createZodDto } from 'nestjs-zod';
import z from 'zod';

const memberIdSchema = z.object({
  value: z.uuid(),
});

export class MemberId extends createZodDto(memberIdSchema) {
  public static generate() {
    return MemberId.schema.parse({ value: crypto.randomUUID() });
  }
}
