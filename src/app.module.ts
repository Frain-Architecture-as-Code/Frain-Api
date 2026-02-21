import { Module } from '@nestjs/common';
import { OrganizationsModule } from './organizations/domain/model/organizations.module';
import { ProjectsModule } from './projects/projects.module';
import { NotificationsModule } from './notifications/notifications.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    OrganizationsModule,
    ProjectsModule,
    NotificationsModule,
    SharedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
