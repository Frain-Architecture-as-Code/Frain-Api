import { EmailAddress } from '../../../../shared/domain/model/valueobjects/email-address';

export class GetAllUserNotificationsQuery {
    constructor(public readonly userEmail: EmailAddress) {}
}
