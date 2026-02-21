import { Module } from '@nestjs/common';
import { OrganizationsModule } from './organizations/organizations.module';
import { ProjectsModule } from './projects/projects.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [OrganizationsModule, ProjectsModule, NotificationsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
