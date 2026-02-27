import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Organization } from './domain/model/organization.entity';
import { Member } from './domain/model/member.entity';
import { Invitation } from './domain/model/invitation.entity';

import { OrganizationsController } from './interfaces/rest/organization.controller';
import { MembersController } from './interfaces/rest/member.controller';
import { InvitationsController } from './interfaces/rest/invitation.controller';
import { InvitationActionsController } from './interfaces/rest/invitation-actions.controller';

import { OrganizationsService } from './application/services/organization.service';
import { MemberService } from './application/services/member.service';
import { InvitationService } from './application/services/invitation.service';
import { InvitationEventListener } from './application/listeners/invitation.listener';
import { NotificationsModule } from '../notifications/notifications.module';
import { OrganizationRepository } from './infrastructure/persistence/repositories/organization.repository';
import { MemberRepository } from './infrastructure/persistence/repositories/member.repository';
import { InvitationRepository } from './infrastructure/persistence/repositories/invitation.repository';

@Module({
    imports: [
        SharedModule,
        NotificationsModule,
        TypeOrmModule.forFeature([Organization, Member, Invitation]),
    ],
    controllers: [
        OrganizationsController,
        MembersController,
        InvitationsController,
        InvitationActionsController,
    ],
    providers: [
        OrganizationsService,
        MemberService,
        InvitationService,
        InvitationEventListener,
        OrganizationRepository,
        MemberRepository,
        InvitationRepository,
    ],
    exports: [MemberService],
})
export class OrganizationsModule {}
