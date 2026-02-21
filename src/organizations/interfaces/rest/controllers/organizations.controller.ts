import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateOrganizationRequest } from '../requests/create-organization.request';
import { OrganizationCommandAssembler } from '../assemblers/organization-command.assembler';

@Controller('api/v1/organizations')
export class OrganizationsController {
  @Get()
  findAll(): Array<string> {
    return ['soy un baboso'];
  }

  @Post()
  createOrganization(@Body() request: CreateOrganizationRequest) {
    const command =
      OrganizationCommandAssembler.toCreateOrganizationCommand(request);
    return `Creating ${request.name} + ${request.visibility}`;
  }
}
