import { CreateOrganizationCommand } from '../../../domain/model/commands/create-organization.command';
import { CreateOrganizationRequest } from '../requests/create-organization.request';
import { OrganizationName } from '../../../domain/model/valueobjects/organization-name';
import { User } from '../../../../shared/domain/model/user';
import { DeleteOrganizationCommand } from '../../../domain/model/commands/delete-organization.command';
import { UserId } from '../../../../shared/domain/model/valueobjects/user-id';
import { OrganizationId } from '../../../domain/model/valueobjects/organization-id';
import { UpdateOrganizationRequest } from '../requests/update-organization.request';
import { UpdateOrganizationCommand } from '../../../domain/model/commands/update-organization.command';

export class OrganizationCommandAssembler {
    public static toCreateOrganizationCommand(
        request: CreateOrganizationRequest,
        user: User,
    ): CreateOrganizationCommand {
        return new CreateOrganizationCommand(
            OrganizationName.fromString(request.name),
            request.visibility,
            user,
        );
    }

    public static toDeleteOrganizationCommand(
        organizationId: string,
        userId: UserId,
    ): DeleteOrganizationCommand {
        return new DeleteOrganizationCommand(
            userId,
            OrganizationId.fromString(organizationId),
        );
    }

    public static toUpdateOrganizationCommand(
        organizationId: string,
        user: User,
        request: UpdateOrganizationRequest,
    ): UpdateOrganizationCommand {
        return new UpdateOrganizationCommand(
            OrganizationId.fromString(organizationId),
            OrganizationName.fromString(request.name),
            request.visibility,
            user.id,
        );
    }
}
