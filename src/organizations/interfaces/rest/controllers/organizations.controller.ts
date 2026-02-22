import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateOrganizationRequest } from '../requests/create-organization.request';
import { OrganizationCommandAssembler } from '../assemblers/organization-command.assembler';
import { UserContext } from 'src/shared/infrastructure/security/user-context';
import { AuthGuard } from 'src/shared/infrastructure/security/auth.guard';
import { OrganizationsService } from 'src/organizations/application/organizations.service';
import { OrganizationAssembler } from '../assemblers/organization.assembler';
import { OrganizationQueryAssembler } from '../assemblers/organization-query.assembler';
import { OrganizationResponse } from '../responses/organization.response';

@UseGuards(AuthGuard)
@Controller('api/v1/organizations')
export class OrganizationsController {
  constructor(
    private userContext: UserContext,
    private organizationService: OrganizationsService,
  ) {}

  @Get()
  async getCurrentUserOrganizations(): Promise<OrganizationResponse[]> {
    const user = this.userContext.user;

    const query = OrganizationQueryAssembler.toGetUserOrganizationsQuery(
      user.userId,
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

    const command = OrganizationCommandAssembler.toCreateOrganizationCommand(
      body,
      user,
    );

    const organizationId =
      await this.organizationService.createOrganization(command);

    const query =
      OrganizationQueryAssembler.toGetOrganizationByIdQuery(organizationId);

    const organization = await this.organizationService.getById(query);

    return OrganizationAssembler.toResponseFromEntity(organization);
  }
}
