import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateOrganizationRequest } from '../requests/create-organization.request';

@Controller('api/v1/organizations')
export class OrganizationsController {
  @Get()
  findAll(): Array<string> {
    return ['soy un baboso'];
  }

  @Post()
  createOrganization(@Body() request: CreateOrganizationRequest) {
    return `Creating ${request.name} + ${request.visibility}`;
  }
}
