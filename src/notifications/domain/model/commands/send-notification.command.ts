import { EmailAddress } from '../../../../shared/domain/model/valueobjects/email-address';
import { NotificationMessage } from '../valueobjects/notification-message';
import { NotificationType } from '../valueobjects/notification-type';
import { ResourceId } from '../valueobjects/resource-id';

export class SendNotificationCommand {
    constructor(
        public readonly message: NotificationMessage,
        public readonly resourceId: ResourceId,
        public readonly recipient: EmailAddress,
        public readonly sender: EmailAddress,
        public readonly type: NotificationType,
    ) {}
}
