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
import { C4ModelController } from './interfaces/rest/c4-model.controller';
import { ApiKeyGuard } from './infrastructure/security/api-key.guard';

@Module({
    imports: [
        TypeOrmModule.forFeature([Project, ProjectApiKey]),
        OrganizationsModule, // usa MemberService
        SharedModule,
    ],
    controllers: [
        ProjectsController,
        ProjectApiKeysController,
        C4ModelController,
    ],
    providers: [
        ProjectsService,
        OrganizationContextAcl,
        ProjectApiKeysService,
        ApiKeyGuard,
    ],
})
export class ProjectsModule {}
