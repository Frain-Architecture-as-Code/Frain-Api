import { NotFoundException } from '@nestjs/common';
import { OrganizationId } from '../model/valueobjects/organization-id';

export class OrganizationNotFoundException extends NotFoundException {
    constructor(organizationId: OrganizationId) {
        super(`Organization with id ${organizationId.toString()} not found`);
    }
}
