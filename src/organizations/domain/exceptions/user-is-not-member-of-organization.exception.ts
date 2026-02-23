import { NotFoundException } from '@nestjs/common';
import { OrganizationId } from '../model/valueobjects/organization-id';
import { UserId } from 'src/shared/domain/model/valueobjects/user-id';

export class UserIsNotMemberOfOrganizationException extends NotFoundException {
    constructor(memberId: UserId, organizationId: OrganizationId) {
        super(
            `Member with user id ${memberId.toString()} not found in organization with ${organizationId.toString()}`,
        );
    }
}
