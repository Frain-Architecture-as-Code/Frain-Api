import { Module } from '@nestjs/common';
import { OrganizationsController } from './interfaces/rest/controllers/organizations.controller';
import { OrganizationsService } from './application/organizations.service';
import { UserContext } from 'src/shared/infrastructure/security/user-context';
import { SharedModule } from 'src/shared/shared.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization } from './domain/model/organization.entity';

@Module({
  imports: [SharedModule, TypeOrmModule.forFeature([Organization])],
  controllers: [OrganizationsController],
  providers: [OrganizationsService, UserContext],
})
export class OrganizationsModule {}
