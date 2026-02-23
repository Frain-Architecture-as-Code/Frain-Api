import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import { CreateOrganizationRequest } from './requests/create-organization.request';
import { OrganizationCommandAssembler } from './assemblers/organization-command.assembler';
import { UserContext } from 'src/shared/infrastructure/security/user-context';
import { AuthGuard } from 'src/shared/infrastructure/security/auth.guard';
import { OrganizationsService } from 'src/organizations/application/services/organization.service';
import { OrganizationAssembler } from './assemblers/organization.assembler';
import { OrganizationQueryAssembler } from './assemblers/organization-query.assembler';
import { OrganizationResponse } from './responses/organization.response';
import { OrganizationId } from 'src/organizations/domain/model/valueobjects/organization-id';
import { UpdateOrganizationRequest } from './requests/update-organization.request';
import { MemberService } from 'src/organizations/application/services/member.service';
import { MemberQueryAssembler } from './assemblers/member-query.assembler';

@UseGuards(AuthGuard)
@Controller('/api/v1/organizations')
export class OrganizationsController {
    constructor(
        private userContext: UserContext,
        private organizationService: OrganizationsService,
        private memberService: MemberService,
    ) {}

    @Get()
    async getCurrentUserOrganizations(): Promise<OrganizationResponse[]> {
        const user = this.userContext.user;

        const query = OrganizationQueryAssembler.toGetUserOrganizationsQuery(
            user.id,
        );

        const organizations =
            await this.organizationService.getUserOrganizations(query);

        return OrganizationAssembler.toResponseListFromEntities(organizations);
    }

    @Post()
    async createOrganization(
        @Body() body: CreateOrganizationRequest,
    ): Promise<OrganizationResponse> {
        const user = this.userContext.user;

        const command =
            OrganizationCommandAssembler.toCreateOrganizationCommand(
                body,
                user,
            );

        const organizationId =
            await this.organizationService.createOrganization(command);

        const query = OrganizationQueryAssembler.toGetOrganizationByIdQuery(
            organizationId.toString(),
        );

        const organization = await this.organizationService.getById(query);

        return OrganizationAssembler.toResponseFromEntity(organization);
    }

    @Get(':organizationId')
    async getOrganizationById(
        @Param('organizationId') id: string,
    ): Promise<OrganizationResponse> {
        const user = this.userContext.user;

        await this.memberService.getMemberByUserIdAndOrganizationId(
            MemberQueryAssembler.toGetMemberByUserIdAndOrganizationIdQuery(
                user.id,
                id,
            ),
        );

        const query = OrganizationQueryAssembler.toGetOrganizationByIdQuery(id);

        const organization = await this.organizationService.getById(query);

        return OrganizationAssembler.toResponseFromEntity(organization);
    }

    @Patch(':organizationId')
    async updateOrganization(
        @Param('organizationId') id: string,
        @Body() body: UpdateOrganizationRequest,
    ): Promise<OrganizationResponse> {
        const user = this.userContext.user;

        const command =
            OrganizationCommandAssembler.toUpdateOrganizationCommand(
                id,
                user,
                body,
            );

        const organization =
            await this.organizationService.updateOrganization(command);

        return OrganizationAssembler.toResponseFromEntity(organization);
    }

    @Delete(':organizationId')
    async deleteOrganization(
        @Param('organizationId') id: string,
    ): Promise<OrganizationId> {
        const user = this.userContext.user;

        const command =
            OrganizationCommandAssembler.toDeleteOrganizationCommand(
                id,
                user.id,
            );

        const result =
            await this.organizationService.deleteOrganization(command);

        return result;
    }
}
