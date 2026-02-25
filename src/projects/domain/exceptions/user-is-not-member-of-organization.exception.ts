import { NotFoundException } from '@nestjs/common';
import { UserId } from '../../../shared/domain/model/valueobjects/user-id';
import { OrganizationId } from '../model/valueobjects/organization-id';

export class UserIsNotMemberOfOrganizationException extends NotFoundException {
    constructor(memberId: UserId, organizationId: OrganizationId) {
        super(
            `Member with user id ${memberId.toString()} not found in organization with ${organizationId.toString()}`,
        );
    }
}
