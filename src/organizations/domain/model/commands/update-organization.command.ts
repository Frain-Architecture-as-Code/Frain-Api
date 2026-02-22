import { UserId } from 'src/shared/domain/model/valueobjects/user-id';
import { OrganizationId } from '../valueobjects/organization-id';
import { OrganizationName } from '../valueobjects/organization-name';
import { OrganizationVisibility } from '../valueobjects/organization-visibility';

export class UpdateOrganizationCommand {
    constructor(
        public readonly organizationId: OrganizationId,
        public readonly name: OrganizationName,
        public readonly visibility: OrganizationVisibility,
        public readonly userId: UserId,
    ) {}
}
