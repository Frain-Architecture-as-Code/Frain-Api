import { OrganizationName } from '../valueobjects/organization-name';
import { OrganizationVisibility } from '../valueobjects/organization-visibility';
import { User } from '../../../../shared/domain/model/user';

export class CreateOrganizationCommand {
    constructor(
        public readonly name: OrganizationName,
        public readonly visibility: OrganizationVisibility,
        public readonly currentUser: User,
    ) {}
}
