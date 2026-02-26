import { Injectable, Logger } from '@nestjs/common';
import { NotificationsService } from '../../application/services/notifications.service';
import { NotificationCommandAssembler } from '../../interfaces/rest/assembler/notification-command.assembler';

@Injectable()
export class NotificationContextAcl {
    private readonly logger = new Logger(NotificationContextAcl.name);

    constructor(private readonly notificationsService: NotificationsService) {}

    async sendNotification(
        recipientEmail: string,
        senderEmail: string,
        message: string,
        resourceId: string,
        type: string,
    ): Promise<string> {
        this.logger.log('Sending notification');
        const command = NotificationCommandAssembler.toSendNotificationCommand(
            recipientEmail,
            senderEmail,
            message,
            resourceId,
            type,
        );

        const notificationId =
            await this.notificationsService.sendNotification(command);

        return notificationId.toString();
    }
}
