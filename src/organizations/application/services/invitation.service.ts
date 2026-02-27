import { Injectable, Logger } from '@nestjs/common';
import { Invitation } from '../../domain/model/invitation.entity';
import { getInvitationsByOrganizationIdQuery } from '../../domain/model/queries/get-invitations-by-organization-id.query';
import { SendInvitationCommand } from '../../domain/model/commands/send-invitation.command';
import { InsufficientPermissionException } from '../../../shared/domain/exceptions/insufficient-permission.exception';
import { InvitationId } from '../../domain/model/valueobjects/invitation-id';
import { MemberService } from './member.service';
import { AcceptInvitationCommand } from '../../domain/model/commands/accept-invitation.command';
import { ExistsInvitationQuery } from '../../domain/model/queries/exists-invitation.query';
import { DeclineInvitationCommand } from '../../domain/model/commands/decline-invitation.command';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InvitationSentEvent } from '../../domain/events/invitation-sent.event';
import { OrganizationNotFoundException } from '../../domain/exceptions/organization-not-found.exception';
import { OrganizationRepository } from '../../infrastructure/persistence/organization.repository';
import { InvitationRepository } from '../../infrastructure/persistence/invitation.repository';

@Injectable()
export class InvitationService {
    private logger = new Logger(InvitationService.name);

    constructor(
        private readonly invitationRepository: InvitationRepository,
        private readonly organizationRepository: OrganizationRepository,
        private readonly memberService: MemberService,
        private readonly eventEmitter: EventEmitter2,
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

        const invitations =
            await this.invitationRepository.findAllByOrganizationId(
                query.organizationId,
            );

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

        const organization =
            await this.organizationRepository.getOrganizationById(
                command.organizationId,
            );

        if (!organization) {
            throw new OrganizationNotFoundException(command.organizationId);
        }

        const savedInvitation =
            await this.invitationRepository.save(invitation);

        this.eventEmitter.emit(
            'invitation.sent',
            new InvitationSentEvent(
                savedInvitation,
                command.user.email,
                organization.name,
            ),
        );

        this.logger.log('Invitation emitted');

        return invitation;
    }

    async getInvitationById(query: ExistsInvitationQuery): Promise<Invitation> {
        const invitation = await this.invitationRepository.findById(
            query.invitationId,
        );

        return invitation;
    }

    async acceptInvitation(
        command: AcceptInvitationCommand,
    ): Promise<InvitationId> {
        const currentInvitation = await this.getInvitationById({
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
        const currentInvitation = await this.getInvitationById({
            invitationId: command.invitationId,
        });

        currentInvitation.decline();

        await this.invitationRepository.save(currentInvitation);

        return currentInvitation.id;
    }
}
