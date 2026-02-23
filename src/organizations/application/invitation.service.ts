import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Invitation } from '../domain/model/invitation.entity';
import { Repository } from 'typeorm';
import { getInvitationsByOrganizationIdQuery } from '../domain/model/queries/get-invitations-by-organization-id.query';
import { SendInvitationCommand } from '../domain/model/commands/send-invitation.command';
import { MemberService } from './member.service';
import { InsufficientPermissionException } from 'src/shared/domain/exceptions/insufficient-permission.exception';
import { InvitationId } from '../domain/model/valueobjects/invitation-id';

@Injectable()
export class InvitationService {
    constructor(
        @InjectRepository(Invitation)
        private memberRepository: Repository<Invitation>,

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

        const invitations = await this.memberRepository.find({
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

        await this.memberRepository.save(invitation);
        // TODO: Emit event to send notification

        return invitation;
    }
}
