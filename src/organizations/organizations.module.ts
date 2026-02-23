import { Module } from '@nestjs/common';
import { OrganizationsController } from './interfaces/rest/organizations.controller';
import { OrganizationsService } from './application/services/organizations.service';
import { UserContext } from 'src/shared/infrastructure/security/user-context';
import { SharedModule } from 'src/shared/shared.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization } from './domain/model/organization.entity';
import { Member } from './domain/model/member.entity';
import { MemberService } from './application/services/member.service';
import { MembersController } from './interfaces/rest/member.controller';
import { Invitation } from './domain/model/invitation.entity';
import { InvitationService } from './application/services/invitation.service';
import { InvitationController } from './interfaces/rest/invitation.controller';

@Module({
    imports: [
        SharedModule,
        TypeOrmModule.forFeature([Organization, Member, Invitation]),
    ],
    controllers: [
        OrganizationsController,
        MembersController,
        InvitationController,
    ],
    providers: [
        OrganizationsService,
        UserContext,
        MemberService,
        InvitationService,
    ],
})
export class OrganizationsModule {}
