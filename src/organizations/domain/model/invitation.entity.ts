import { Column, Entity } from 'typeorm';
import { InvitationId } from './valueobjects/invitation-id';
import { EmailAddress } from 'src/shared/domain/model/valueobjects/email-address';
import { MemberRole } from './valueobjects/member-role';
import { OrganizationId } from './valueobjects/organization-id';
import { MemberId } from './valueobjects/member-id';
import { InvitationStatus } from './valueobjects/invitation-status';
import { PrimaryColumn } from 'typeorm/browser';
import { createValueObjectTransformer } from 'src/shared/infrastructure/persistence/typeorm/transformers';

@Entity()
export class Invitation {
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
}
