import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Invitation } from '../../domain/model/invitation.entity';
import { Repository } from 'typeorm';
import { getInvitationsByOrganizationIdQuery } from '../../domain/model/queries/get-invitations-by-organization-id.query';
import { SendInvitationCommand } from '../../domain/model/commands/send-invitation.command';
import { InsufficientPermissionException } from 'src/shared/domain/exceptions/insufficient-permission.exception';
import { InvitationId } from '../../domain/model/valueobjects/invitation-id';
import { MemberService } from './member.service';
import { AcceptInvitationCommand } from 'src/organizations/domain/model/commands/accept-invitation.command';
import { InvitationNotFoundException } from 'src/organizations/domain/exceptions/invitation-not-found.exception';
import { MemberAlreadyExistsException } from 'src/organizations/domain/exceptions/member-already-exists.exception';
import { Member } from 'src/organizations/domain/model/member.entity';
import { MemberId } from 'src/organizations/domain/model/valueobjects/member-id';
import { MemberName } from 'src/organizations/domain/model/valueobjects/member-name';
import { ExistsInvitationQuery } from 'src/organizations/domain/model/queries/exists-invitation.query';
import { DeclineInvitationCommand } from 'src/organizations/domain/model/commands/decline-invitation.command';

@Injectable()
export class InvitationService {
    constructor(
        @InjectRepository(Invitation)
        private invitationRepository: Repository<Invitation>,
        private memberService: MemberService,
    ) {}

    async getInvitationsByOrganizationId(
        query: getInvitationsByOrganizationIdQuery,
    ): Promise<Invitation[]> {
        // validates if the user is part of the organizationId
        const currentMember =
            await this.memberService.getMemberByUserIdAndOrganizationId({
                organizationId: query.organizationId,
                userId: query.userId,
            });

        if (currentMember.isContributor()) {
            throw new InsufficientPermissionException(
                'Only owners and admins can view invitations',
            );
        }

        const invitations = await this.invitationRepository.find({
            where: { organizationId: query.organizationId },
        });
        return invitations;
    }

    async sendInvitation(command: SendInvitationCommand): Promise<Invitation> {
        const currentMember =
            await this.memberService.getMemberByUserIdAndOrganizationId({
                userId: command.user.id,
                organizationId: command.organizationId,
            });

        // only owners and admins can send invitations
        if (!currentMember.canInvitePeople()) {
            throw new InsufficientPermissionException(
                'Only owners and admins can send invitations',
            );
        }

        const invitationId = InvitationId.generate();

        const invitation = Invitation.create({
            invitationId,
            inviterId: currentMember.id,
            targetEmail: command.targetEmail,
            role: command.role,
            organizationId: command.organizationId,
        });

        await this.invitationRepository.save(invitation);
        // TODO: Emit event to send notification

        return invitation;
    }

    async existsInvitation(query: ExistsInvitationQuery): Promise<Invitation> {
        const invitation = await this.invitationRepository.findOne({
            where: {
                id: query.invitationId,
            },
        });

        if (!invitation) {
            throw new InvitationNotFoundException(query.invitationId);
        }

        return invitation;
    }

    async acceptInvitation(
        command: AcceptInvitationCommand,
    ): Promise<InvitationId> {
        const currentInvitation = await this.existsInvitation({
            invitationId: command.invitationId,
        });

        // validate also if the current user has the same email as the target email
        if (!currentInvitation.targetEmail.equals(command.user.email)) {
            throw new InsufficientPermissionException(
                'The email address does not match the invitation',
            );
        }

        await this.memberService.enrollMemberToOrganization({
            organizationId: currentInvitation.organizationId,
            role: currentInvitation.role,
            user: command.user,
        });

        currentInvitation.accept();

        await this.invitationRepository.save(currentInvitation);

        return currentInvitation.id;
    }

    async declineInvitation(
        command: DeclineInvitationCommand,
    ): Promise<InvitationId> {
        const currentInvitation = await this.existsInvitation({
            invitationId: command.invitationId,
        });

        currentInvitation.decline();

        await this.invitationRepository.save(currentInvitation);

        return currentInvitation.id;
    }
}
