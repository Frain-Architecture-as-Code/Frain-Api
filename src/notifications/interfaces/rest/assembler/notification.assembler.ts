import { Notification } from '../../../domain/model/notification.entity';
import { NotificationResponse } from '../responses/notification.response';

export class NotificationAssembler {
    static toResponseFromEntity(
        notification: Notification,
    ): NotificationResponse {
        return {
            notificationId: notification.id.toString(),
            type: notification.type,
            message: notification.message.toString(),
            senderEmail: notification.senderEmail.toString(),
            status: notification.status,
            resourceId: notification.resourceId.toString(),
            recipientEmail: notification.recipientEmail.toString(),
            createdAt: notification.createdAt.toISOString(),
            updatedAt: notification.updatedAt.toISOString(),
        };
    }

    static toResponsesFromEntities(
        notifications: Notification[],
    ): NotificationResponse[] {
        return notifications.map((noti) =>
            NotificationAssembler.toResponseFromEntity(noti),
        );
    }
}
