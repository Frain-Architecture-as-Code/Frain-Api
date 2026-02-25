import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Notification } from './domain/model/notification.entity';
import { NotificationsController } from './interfaces/rest/notifications.controller';
import { NotificationsService } from './application/services/notifications.service';
import { NotificationContextAcl } from './infrastructure/acl/notification-context.acl';
import { SharedModule } from '../shared/shared.module';

@Module({
    imports: [TypeOrmModule.forFeature([Notification]), SharedModule],
    controllers: [NotificationsController],
    providers: [NotificationsService, NotificationContextAcl],
    exports: [NotificationContextAcl],
})
export class NotificationsModule {}
