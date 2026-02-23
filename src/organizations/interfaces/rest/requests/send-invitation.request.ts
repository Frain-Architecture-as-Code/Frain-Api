import { createZodDto } from 'nestjs-zod';
import { MemberRole } from 'src/organizations/domain/model/valueobjects/member-role';
import z from 'zod';

const sendInvitationRequestSchema = z.object({
    role: z.enum(MemberRole),
    targetEmail: z.email(),
});

export class SendInvitationRequest extends createZodDto(
    sendInvitationRequestSchema,
) {}
