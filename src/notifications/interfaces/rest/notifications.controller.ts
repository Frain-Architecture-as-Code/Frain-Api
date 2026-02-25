import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../../shared/infrastructure/security/auth.guard';
import { UserContext } from '../../../shared/infrastructure/security/user-context';
import { NotificationsService } from '../../application/services/notifications.service';
import { GetAllUserNotificationsQuery } from '../../domain/model/queries/get-all-user-notifications.query';
import { GetNotificationByIdQuery } from '../../domain/model/queries/get-notification-by-id.query';
import { NotificationNotFoundException } from '../../domain/exceptions/notification-not-found.exception';
import { NotificationAssembler } from './assembler/notification.assembler';
import { NotificationCommandAssembler } from './assembler/notification-command.assembler';
import { UpdateNotificationStatusRequest } from './requests/update-notification-status.request';
import { NotificationResponse } from './responses/notification.response';

@Controller('api/v1/notifications')
@UseGuards(AuthGuard)
export class NotificationsController {
    constructor(
        private readonly notificationsService: NotificationsService,
        private readonly userContext: UserContext,
    ) {}

    @Get()
    async getAllUserNotifications(): Promise<NotificationResponse[]> {
        const emailAddress = this.userContext.user.email;

        const query = new GetAllUserNotificationsQuery(emailAddress);
        const notifications =
            await this.notificationsService.getAllUserNotifications(query);

        return NotificationAssembler.toResponsesFromEntities(notifications);
    }

    @Patch(':notificationId')
    async updateNotificationStatus(
        @Body() request: UpdateNotificationStatusRequest,
        @Param('notificationId') notificationId: string,
    ): Promise<NotificationResponse> {
        const userEmail = this.userContext.user.email;

        const command =
            NotificationCommandAssembler.toUpdateNotificationStatusCommand(
                request,
                notificationId,
                userEmail,
            );

        const resultNotificationId =
            await this.notificationsService.updateNotificationStatus(command);

        const result = await this.notificationsService.getNotificationById(
            new GetNotificationByIdQuery(resultNotificationId),
        );

        if (!result) {
            throw new NotificationNotFoundException(resultNotificationId);
        }

        return NotificationAssembler.toResponseFromEntity(result);
    }
}
