import { Column, Entity, PrimaryColumn } from 'typeorm';
import { createValueObjectTransformer } from '../../../shared/infrastructure/persistence/typeorm/transformers';
import { AuditableEntity } from '../../../shared/domain/model/auditable-entity';
import { NotificationId } from './valueobjects/notification-id';
import { NotificationType } from './valueobjects/notification-type';
import { NotificationMessage } from './valueobjects/notification-message';
import { NotificationStatus } from './valueobjects/notification-status';
import { ResourceId } from './valueobjects/resource-id';
import { EmailAddress } from '../../../shared/domain/model/valueobjects/email-address';

@Entity()
export class Notification extends AuditableEntity {
    @PrimaryColumn({
        type: 'uuid',
        transformer: createValueObjectTransformer(NotificationId),
    })
    id: NotificationId;

    @Column({
        type: 'enum',
        enum: NotificationType,
    })
    type: NotificationType;

    @Column({
        type: 'varchar',
        transformer: createValueObjectTransformer(NotificationMessage),
    })
    message: NotificationMessage;

    @Column({
        type: 'enum',
        enum: NotificationStatus,
        default: NotificationStatus.UNREAD,
    })
    status: NotificationStatus;

    @Column({
        type: 'uuid',
        transformer: createValueObjectTransformer(ResourceId),
    })
    resourceId: ResourceId;

    @Column({
        type: 'varchar',
        name: 'recipient_email',
        transformer: createValueObjectTransformer(EmailAddress),
    })
    recipientEmail: EmailAddress;

    @Column({
        type: 'varchar',
        name: 'sender_email',
        transformer: createValueObjectTransformer(EmailAddress),
    })
    senderEmail: EmailAddress;

    static create(props: {
        id: NotificationId;
        type: NotificationType;
        message: NotificationMessage;
        resourceId: ResourceId;
        recipientEmail: EmailAddress;
        senderEmail: EmailAddress;
    }): Notification {
        const notification = new Notification();
        notification.id = props.id;
        notification.type = props.type;
        notification.message = props.message;
        notification.status = NotificationStatus.UNREAD;
        notification.resourceId = props.resourceId;
        notification.recipientEmail = props.recipientEmail;
        notification.senderEmail = props.senderEmail;
        return notification;
    }

    public markAsRead(): void {
        if (this.status === NotificationStatus.UNREAD) {
            this.status = NotificationStatus.READ;
        }
    }

    public markAsUnread(): void {
        if (this.status === NotificationStatus.READ) {
            this.status = NotificationStatus.UNREAD;
        }
    }

    public markAsArchived(): void {
        if (this.status !== NotificationStatus.ARCHIVED) {
            this.status = NotificationStatus.ARCHIVED;
        }
    }

    public resend(): void {
        this.status = NotificationStatus.UNREAD;
    }
}
