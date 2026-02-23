import { createZodDto } from 'nestjs-zod';
import { MemberRole } from 'src/organizations/domain/model/valueobjects/member-role';
import z from 'zod';

const updateMemberRequestSchema = z.object({
    newName: z.string().optional(),
    newRole: z.enum(MemberRole).optional(),
});

export class UpdateMemberRequest extends createZodDto(
    updateMemberRequestSchema,
) {}
