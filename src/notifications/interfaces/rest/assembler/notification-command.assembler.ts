import { EmailAddress } from '../../../../shared/domain/model/valueobjects/email-address';
import { SendNotificationCommand } from '../../../domain/model/commands/send-notification.command';
import { UpdateNotificationStatusCommand } from '../../../domain/model/commands/update-notification-status.command';
import { NotificationId } from '../../../domain/model/valueobjects/notification-id';
import { NotificationMessage } from '../../../domain/model/valueobjects/notification-message';
import { NotificationType } from '../../../domain/model/valueobjects/notification-type';
import { ResourceId } from '../../../domain/model/valueobjects/resource-id';
import { UpdateNotificationStatusRequest } from '../requests/update-notification-status.request';

export class NotificationCommandAssembler {
    static toUpdateNotificationStatusCommand(
        request: UpdateNotificationStatusRequest,
        notificationId: string,
        userEmail: EmailAddress,
    ): UpdateNotificationStatusCommand {
        return new UpdateNotificationStatusCommand(
            NotificationId.fromString(notificationId),
            request.newStatus,
            userEmail,
        );
    }

    static toSendNotificationCommand(
        recipientEmail: string,
        senderEmail: string,
        message: string,
        resourceId: string,
        type: string,
    ): SendNotificationCommand {
        return new SendNotificationCommand(
            NotificationMessage.fromString(message),
            ResourceId.fromString(resourceId),
            EmailAddress.fromString(recipientEmail),
            EmailAddress.fromString(senderEmail),
            NotificationType[type as keyof typeof NotificationType],
        );
    }
}
