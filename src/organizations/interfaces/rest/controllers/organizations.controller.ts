import { Controller, Get } from '@nestjs/common';

@Controller('organizations')
export class OrganizationsController {
  @Get()
  findAll(): Array<string> {
    return ['soy un baboso'];
  }
}
