import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Project } from './domain/model/project.entity';
import { ProjectsController } from './interfaces/rest/projects.controller';
import { ProjectsService } from './application/services/projects.service';

import { OrganizationsModule } from '../organizations/organizations.module';
import { SharedModule } from '../shared/shared.module';
import { OrganizationContextAcl } from '../organizations/infrastructure/acl/organization-context.acl';
import { ProjectApiKey } from './domain/model/project-api-key.entity';
import { ProjectApiKeysController } from './interfaces/rest/project-api-keys.controller';
import { ProjectApiKeysService } from './application/services/project-api-keys.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Project, ProjectApiKey]),
        OrganizationsModule, // usa MemberService
        SharedModule,
    ],
    controllers: [ProjectsController, ProjectApiKeysController],
    providers: [ProjectsService, OrganizationContextAcl, ProjectApiKeysService],
})
export class ProjectsModule {}
