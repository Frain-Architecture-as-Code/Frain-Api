import { Injectable, Logger } from '@nestjs/common';
import { Notification } from '../../domain/model/notification.entity';
import { NotificationId } from '../../domain/model/valueobjects/notification-id';
import { NotificationNotFoundException } from '../../domain/exceptions/notification-not-found.exception';
import { InsufficientPermissionException } from '../../../shared/domain/exceptions/insufficient-permission.exception';
import { SendNotificationCommand } from '../../domain/model/commands/send-notification.command';
import { UpdateNotificationStatusCommand } from '../../domain/model/commands/update-notification-status.command';
import { GetAllUserNotificationsQuery } from '../../domain/model/queries/get-all-user-notifications.query';
import { GetNotificationByIdQuery } from '../../domain/model/queries/get-notification-by-id.query';
import { NotificationStatus } from '../../domain/model/valueobjects/notification-status';
import { NotificationRepository } from '../../infrastructure/persistence/repositories/notification.repository';

@Injectable()
export class NotificationsService {
    private readonly logger = new Logger(NotificationsService.name);

    constructor(private notificationRepository: NotificationRepository) {}

    async sendNotification(
        command: SendNotificationCommand,
    ): Promise<NotificationId> {
        const notificationId = NotificationId.generate();

        const notification = Notification.create({
            id: notificationId,
            type: command.type,
            message: command.message,
            resourceId: command.resourceId,
            recipientEmail: command.recipient,
            senderEmail: command.sender,
        });

        await this.notificationRepository.save(notification);

        return notificationId;
    }

    async updateNotificationStatus(
        command: UpdateNotificationStatusCommand,
    ): Promise<NotificationId> {
        const notification = await this.notificationRepository.findById(
            command.notificationId,
        );

        if (!notification) {
            throw new NotificationNotFoundException(command.notificationId);
        }

        if (!notification.recipientEmail.equals(command.currentUserEmail)) {
            throw new InsufficientPermissionException(
                'User does not have permission to update this notification',
            );
        }

        switch (command.status) {
            case NotificationStatus.READ:
                notification.markAsRead();
                break;
            case NotificationStatus.UNREAD:
                notification.markAsUnread();
                break;
            case NotificationStatus.ARCHIVED:
                notification.markAsArchived();
                break;
        }

        await this.notificationRepository.save(notification);

        return notification.id;
    }

    async getAllUserNotifications(
        query: GetAllUserNotificationsQuery,
    ): Promise<Notification[]> {
        return this.notificationRepository.findAllByRecipientEmail(
            query.userEmail,
        );
    }

    async getNotificationById(
        query: GetNotificationByIdQuery,
    ): Promise<Notification> {
        return this.notificationRepository.findById(query.notificationId);
    }
}
