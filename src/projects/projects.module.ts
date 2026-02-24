import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Project } from './domain/model/project.entity';
import { ProjectsController } from './interfaces/rest/projects.controller';
import { ProjectsService } from './application/services/projects.service';

import { OrganizationsModule } from '../organizations/organizations.module';
import { SharedModule } from '../shared/shared.module';
import { OrganizationContextAcl } from '../organizations/infrastructure/acl/organization-context.acl';

@Module({
    imports: [
        TypeOrmModule.forFeature([Project]),
        OrganizationsModule, // usa MemberService
        SharedModule,
    ],
    controllers: [ProjectsController],
    providers: [ProjectsService, OrganizationContextAcl],
})
export class ProjectsModule {}
