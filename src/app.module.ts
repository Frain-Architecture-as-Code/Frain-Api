import {
    ZodValidationPipe,
    ZodSerializerInterceptor,
    ZodSerializationException,
} from 'nestjs-zod';
import {
    APP_PIPE,
    APP_INTERCEPTOR,
    APP_FILTER,
    BaseExceptionFilter,
} from '@nestjs/core';
import { ZodError } from 'zod';
import {
    Module,
    HttpException,
    ArgumentsHost,
    Logger,
    Catch,
} from '@nestjs/common';
import { OrganizationsModule } from './organizations/organizations.module';
import { ProjectsModule } from './projects/projects.module';
import { NotificationsModule } from './notifications/notifications.module';
import { SharedModule } from './shared/shared.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization } from './organizations/domain/model/organization.entity';
import { Member } from './organizations/domain/model/member.entity';
import { Invitation } from './organizations/domain/model/invitation.entity';
import { HealthController } from './shared/interfaces/rest/health.controller';
import { Project } from './projects/domain/model/project.entity';

@Catch(HttpException)
class HttpExceptionFilter extends BaseExceptionFilter {
    private logger = new Logger(HttpExceptionFilter.name);

    catch(exception: HttpException, host: ArgumentsHost) {
        if (exception instanceof ZodSerializationException) {
            const zodError = exception.getZodError();

            if (zodError instanceof ZodError) {
                this.logger.error(
                    `ZodSerializationException: ${zodError.message}`,
                );
            }
        }

        super.catch(exception, host);
    }
}

@Module({
    imports: [
        OrganizationsModule,
        ProjectsModule,
        NotificationsModule,
        SharedModule,
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                type: 'postgres',
                host: config.get<string>('DB_HOST'),
                port: config.get<number>('DB_PORT'),
                username: config.get<string>('DB_USER'),
                password: config.get<string>('DB_PASSWORD'),
                database: config.get<string>('DB_NAME'),
                ssl: config.get<boolean>('DB_SSL'),
                entities: [Organization, Member, Invitation, Project],
                synchronize: true,
            }),
        }),
    ],
    controllers: [HealthController],
    providers: [
        {
            provide: APP_PIPE,
            useClass: ZodValidationPipe,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: ZodSerializerInterceptor,
        },
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter,
        },
    ],
})
export class AppModule {}
