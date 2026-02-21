import { Module } from '@nestjs/common';
import { OrganizationsModule } from './organizations/organizations.module';
import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [OrganizationsModule, ProjectsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
