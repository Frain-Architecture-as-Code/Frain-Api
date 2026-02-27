import { NotFoundException } from '@nestjs/common';
import { OrganizationId } from '../model/valueobjects/organization-id';
import { UserId } from '../../../shared/domain/model/valueobjects/user-id';

export class UserIsNotMemberOfOrganizationException extends NotFoundException {
    constructor(userId: UserId, organizationId: OrganizationId) {
        super(
            `Member with user id ${userId.toString()} not found in organization with ${organizationId.toString()}`,
        );
    }
}
