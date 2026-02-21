import { Module } from '@nestjs/common';
import { OrganizationsController } from '../../interfaces/rest/controllers/organizations.controller';
import { OrganizationsService } from '../../application/organizations.service';

@Module({
  controllers: [OrganizationsController],
  providers: [OrganizationsService],
})
export class OrganizationsModule {}
