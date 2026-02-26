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

@Module({
    imports: [
        SharedModule,
        TypeOrmModule.forFeature([Organization, Member, Invitation]),
    ],
    controllers: [
        OrganizationsController,
        MembersController,
        InvitationsController,
        InvitationActionsController,
    ],
    providers: [OrganizationsService, MemberService, InvitationService],
    exports: [
        MemberService, // 👈 solo lo que otros necesitan
    ],
})
export class OrganizationsModule {}
