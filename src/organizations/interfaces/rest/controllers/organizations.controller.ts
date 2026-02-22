import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateOrganizationRequest } from '../requests/create-organization.request';
import { OrganizationCommandAssembler } from '../assemblers/organization-command.assembler';
import { UserContext } from 'src/shared/infrastructure/security/user-context';
import { AuthGuard } from 'src/shared/infrastructure/security/auth.guard';
import { OrganizationsService } from 'src/organizations/application/organizations.service';
import { OrganizationAssembler } from '../assemblers/organization.assembler';
import { OrganizationQueryAssembler } from '../assemblers/organization-query.assembler';

@UseGuards(AuthGuard)
@Controller('api/v1/organizations')
export class OrganizationsController {
  constructor(
    private userContext: UserContext,
    private organizationService: OrganizationsService,
  ) {}

  // @Get()
  // async getCurrentUserOrganizations(): OrganizationResponse[] {
  //   const user = this.userContext.user;

  //   const organizations = await this.organizationService.getByUserId(user.id);

  //   return organizations.map(OrganizationAssembler.toResponseFromEntity);
  // }

  @Post()
  async createOrganization(@Body() body: CreateOrganizationRequest) {
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
