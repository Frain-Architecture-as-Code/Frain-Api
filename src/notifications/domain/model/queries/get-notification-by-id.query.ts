import { NotificationId } from '../valueobjects/notification-id';

export class GetNotificationByIdQuery {
    constructor(public readonly notificationId: NotificationId) {}
}
