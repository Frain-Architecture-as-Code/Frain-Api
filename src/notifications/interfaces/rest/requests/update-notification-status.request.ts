import z from 'zod';
import { createZodDto } from 'nestjs-zod';
import { NotificationStatus } from '../../../domain/model/valueobjects/notification-status';

const updateNotificationStatusRequestSchema = z.object({
    newStatus: z.enum(NotificationStatus, {
        message: 'newStatus must be a valid NotificationStatus',
    }),
});

export class UpdateNotificationStatusRequest extends createZodDto(
    updateNotificationStatusRequestSchema,
) {}
