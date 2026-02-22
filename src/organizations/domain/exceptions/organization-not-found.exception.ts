import { NotFoundException } from 'src/shared/domain/exceptions/not-found-exception';
import { OrganizationId } from '../model/valueobjects/organization-id';

export class OrganizationNotFoundException extends NotFoundException {
    constructor(organizationId: OrganizationId) {
        super(`Organization with id ${organizationId.toString()} not found`);
    }
}
