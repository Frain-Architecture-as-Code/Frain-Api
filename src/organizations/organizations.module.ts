import { Module } from '@nestjs/common';
import { OrganizationsController } from './interfaces/rest/organizations.controller';
import { OrganizationsService } from './application/organizations.service';
import { UserContext } from 'src/shared/infrastructure/security/user-context';
import { SharedModule } from 'src/shared/shared.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization } from './domain/model/organization.entity';
import { Member } from './domain/model/member.entity';

@Module({
  imports: [SharedModule, TypeOrmModule.forFeature([Organization, Member])],
  controllers: [OrganizationsController],
  providers: [OrganizationsService, UserContext],
})
export class OrganizationsModule {}
