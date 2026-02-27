import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Invitation } from '../../domain/model/invitation.entity';
import { Repository } from 'typeorm';
import { OrganizationId } from '../../domain/model/valueobjects/organization-id';
import { InvitationId } from '../../domain/model/valueobjects/invitation-id';
import { InvitationNotFoundException } from '../../domain/exceptions/invitation-not-found.exception';

@Injectable()
export class InvitationRepository {
    constructor(
        @InjectRepository(Invitation)
        private readonly invitationRepository: Repository<Invitation>,
    ) {}

    async findAllByOrganizationId(
        organizationId: OrganizationId,
    ): Promise<Invitation[]> {
        return this.invitationRepository.find({
            where: { organizationId },
        });
    }

    async save(invitation: Invitation): Promise<Invitation> {
        return await this.invitationRepository.save(invitation);
    }

    async existsById(id: InvitationId): Promise<boolean> {
        const invitation = await this.invitationRepository.findOne({
            where: { id },
        });
        return !!invitation;
    }

    async findById(id: InvitationId) {
        const invitation = await this.invitationRepository.findOne({
            where: { id },
        });

        if (!invitation) {
            throw new InvitationNotFoundException(id);
        }

        return invitation;
    }
}
