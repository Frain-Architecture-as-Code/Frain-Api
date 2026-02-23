import { Column, Entity, PrimaryColumn } from 'typeorm';
import { MemberId } from './valueobjects/member-id';
import { createValueObjectTransformer } from '../../../shared/infrastructure/persistence/typeorm/transformers';
import { UserId } from '../../../shared/domain/model/valueobjects/user-id';
import { OrganizationId } from './valueobjects/organization-id';
import { MemberName } from './valueobjects/member-name';
import { Picture } from '../../../shared/domain/model/valueobjects/picture';
import { AuditableEntity } from '../../../shared/domain/model/auditable-entity';
import { MemberRole } from './valueobjects/member-role';

@Entity()
export class Member extends AuditableEntity {
    @PrimaryColumn({
        type: 'uuid',
        transformer: createValueObjectTransformer(MemberId),
    })
    id: MemberId;

    @Column({
        type: 'uuid',
        transformer: createValueObjectTransformer(UserId),
    })
    userId: UserId;

    @Column({
        type: 'uuid',
        transformer: createValueObjectTransformer(OrganizationId),
    })
    organizationId: OrganizationId;

    @Column({
        type: 'varchar',
        transformer: createValueObjectTransformer(MemberName),
    })
    name: MemberName;

    @Column({
        type: 'varchar',
        transformer: createValueObjectTransformer(Picture),
    })
    picture: Picture;

    @Column({
        type: 'enum',
        enum: MemberRole,
        default: MemberRole.CONTRIBUTOR,
    })
    role: MemberRole;

    public static create(params: {
        memberId: MemberId;
        userId: UserId;
        organizationId: OrganizationId;
        name: MemberName;
        picture: Picture;
        role: MemberRole;
    }) {
        const member = new Member();

        member.id = params.memberId;
        member.userId = params.userId;
        member.name = params.name;
        member.organizationId = params.organizationId;
        member.picture = params.picture;
        member.role = params.role;

        return member;
    }

    public isOwner(): boolean {
        return this.role === MemberRole.OWNER;
    }

    public isAdmin(): boolean {
        return this.role === MemberRole.ADMIN;
    }
    public isContributor(): boolean {
        return this.role === MemberRole.CONTRIBUTOR;
    }

    public canInvitePeople(): boolean {
        return this.role === MemberRole.OWNER || this.role === MemberRole.ADMIN;
    }

    public update(newName?: MemberName, newRole?: MemberRole): Member {
        if (newName !== undefined) {
            this.name = newName;
        }
        if (newRole !== undefined) {
            this.role = newRole;
        }
        return this;
    }
}
