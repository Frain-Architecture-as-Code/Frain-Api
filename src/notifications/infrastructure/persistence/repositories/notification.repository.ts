import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from '../../../domain/model/notification.entity';
import { Repository } from 'typeorm';
import { NotificationId } from '../../../domain/model/valueobjects/notification-id';
import { NotificationNotFoundException } from '../../../domain/exceptions/notification-not-found.exception';
import { EmailAddress } from '../../../../shared/domain/model/valueobjects/email-address';

@Injectable()
export class NotificationRepository {
    constructor(
        @InjectRepository(Notification)
        private readonly notificationRepository: Repository<Notification>,
    ) {}

    async save(notification: Notification): Promise<Notification> {
        return await this.notificationRepository.save(notification);
    }

    async findById(id: NotificationId): Promise<Notification> {
        const notification = await this.notificationRepository.findOne({
            where: { id },
        });
        if (notification === null) {
            throw new NotificationNotFoundException(id);
        }
        return notification;
    }

    async findAllByRecipientEmail(
        email: EmailAddress,
    ): Promise<Notification[]> {
        return await this.notificationRepository.find({
            where: { recipientEmail: email },
        });
    }
}
