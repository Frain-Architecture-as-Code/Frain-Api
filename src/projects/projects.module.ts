import { Module } from '@nestjs/common';
import { ProjectsController } from './interfaces/rest/projects.controller';
import { ProjectsService } from './projects.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './domain/model/project.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Project])],
    controllers: [ProjectsController],
    providers: [ProjectsService],
})
export class ProjectsModule {}
