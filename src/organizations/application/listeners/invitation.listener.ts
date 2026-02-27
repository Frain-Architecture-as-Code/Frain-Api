import { OnEvent } from '@nestjs/event-emitter';
import { InvitationSentEvent } from '../../domain/events/invitation-sent.event';
import { Injectable, Logger } from '@nestjs/common';
import { NotificationContextAcl } from '../../../notifications/infrastructure/acl/notification-context.acl';
import { NotificationType } from '../../../notifications/domain/model/valueobjects/notification-type';

@Injectable()
export class InvitationEventListener {
    private readonly logger = new Logger(InvitationEventListener.name);

    constructor(private notificationContextAcl: NotificationContextAcl) {}

    @OnEvent('invitation.sent')
    async handleInvitationSentEvent(event: InvitationSentEvent) {
        const invitation = event.invitation;

        await this.notificationContextAcl.sendNotification(
            invitation.targetEmail.toString(),
            event.senderEmail.toString(),
            `You have been invited to join ${event.organizationName.toString()}`,
            invitation.id.toString(),
            NotificationType.INVITATION,
        );
        this.logger.log(
            `Invitation sent to ${event.invitation.targetEmail.toString()}`,
        );
    }
}
