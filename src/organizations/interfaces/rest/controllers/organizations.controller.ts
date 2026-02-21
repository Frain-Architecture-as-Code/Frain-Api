import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateOrganizationRequest } from '../requests/create-organization.request';
import { OrganizationCommandAssembler } from '../assemblers/organization-command.assembler';
import { UserContext } from 'src/shared/infrastructure/security/user-context';
import { AuthGuard } from 'src/shared/infrastructure/security/auth.guard';

@UseGuards(AuthGuard)
@Controller('api/v1/organizations')
export class OrganizationsController {
  constructor(private userContext: UserContext) {}

  @Get()
  findAll(): Array<string> {
    return ['soy un baboso'];
  }

  @Post()
  createOrganization(@Body() body: CreateOrganizationRequest) {
    const user = this.userContext.user;
    const command = OrganizationCommandAssembler.toCreateOrganizationCommand(
      body,
      user,
    );
    return `Creating ${command.name.value} ${command.visibility}`;
  }
}
