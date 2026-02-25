import { EmailAddress } from '../../../../shared/domain/model/valueobjects/email-address';
import { NotificationId } from '../valueobjects/notification-id';
import { NotificationStatus } from '../valueobjects/notification-status';

export class UpdateNotificationStatusCommand {
    constructor(
        public readonly notificationId: NotificationId,
        public readonly status: NotificationStatus,
        public readonly currentUserEmail: EmailAddress,
    ) {}
}
