import { NotFoundException } from '@nestjs/common';
import { NotificationId } from '../model/valueobjects/notification-id';

export class NotificationNotFoundException extends NotFoundException {
    constructor(notificationId: NotificationId) {
        super(`Notification with id ${notificationId.toString()} not found`);
    }
}
