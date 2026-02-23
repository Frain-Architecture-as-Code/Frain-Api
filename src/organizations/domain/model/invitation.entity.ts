import { Column, Entity } from 'typeorm';
import { InvitationId } from './valueobjects/invitation-id';
import { EmailAddress } from 'src/shared/domain/model/valueobjects/email-address';
import { MemberRole } from './valueobjects/member-role';
import { OrganizationId } from './valueobjects/organization-id';
import { MemberId } from './valueobjects/member-id';
import { InvitationStatus } from './valueobjects/invitation-status';
import { PrimaryColumn } from 'typeorm';
import { createValueObjectTransformer } from 'src/shared/infrastructure/persistence/typeorm/transformers';
import { AuditableEntity } from 'src/shared/domain/model/auditable-entity';
import { InvalidInvitationStatusChangeException } from '../exceptions/invalid-invitation-status-change.exception';

@Entity()
export class Invitation extends AuditableEntity {
    @PrimaryColumn({
        type: 'uuid',
        transformer: createValueObjectTransformer(InvitationId),
    })
    id: InvitationId;

    @Column({
        type: 'varchar',
        transformer: createValueObjectTransformer(EmailAddress),
    })
    targetEmail: EmailAddress;

    @Column({
        type: 'enum',
        enum: MemberRole,
    })
    role: MemberRole;

    @Column({
        type: 'uuid',
        transformer: createValueObjectTransformer(OrganizationId),
    })
    organizationId: OrganizationId;

    @Column({
        type: 'uuid',
        transformer: createValueObjectTransformer(MemberId),
    })
    inviterId: MemberId;

    @Column({
        type: 'enum',
        enum: InvitationStatus,
    })
    status: InvitationStatus;

    public static create(params: {
        invitationId: InvitationId;
        targetEmail: EmailAddress;
        role: MemberRole;
        organizationId: OrganizationId;
        inviterId: MemberId;
    }): Invitation {
        const invitation = new Invitation();
        invitation.id = params.invitationId;
        invitation.targetEmail = params.targetEmail;
        invitation.role = params.role;
        invitation.organizationId = params.organizationId;
        invitation.inviterId = params.inviterId;
        invitation.status = InvitationStatus.PENDING;
        return invitation;
    }

    public accept(): void {
        if (this.status !== InvitationStatus.PENDING) {
            throw new InvalidInvitationStatusChangeException(
                this.status,
                InvitationStatus.ACCEPTED,
            );
        }
        this.status = InvitationStatus.ACCEPTED;
    }

    public decline(): void {
        if (this.status !== InvitationStatus.PENDING) {
            throw new InvalidInvitationStatusChangeException(
                this.status,
                InvitationStatus.DECLINED,
            );
        }
        this.status = InvitationStatus.DECLINED;
    }
}
