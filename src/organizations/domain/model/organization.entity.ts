import { Column, Entity, PrimaryColumn } from 'typeorm';
import { OrganizationId } from './valueobjects/organization-id';
import { OrganizationName } from './valueobjects/organization-name';
import { OrganizationVisibility } from './valueobjects/organization-visibility';
import { MemberId } from './valueobjects/member-id';
import { AuditableEntity } from 'src/shared/domain/model/auditable-entity';
import { createValueObjectTransformer } from 'src/shared/infrastructure/persistence/typeorm/transformers';

@Entity()
export class Organization extends AuditableEntity {
    @PrimaryColumn({
        type: 'uuid',
        transformer: createValueObjectTransformer(OrganizationId),
    })
    id: OrganizationId;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
        transformer: createValueObjectTransformer(OrganizationName),
    })
    name: OrganizationName;

    @Column({
        type: 'enum',
        enum: OrganizationVisibility,
        default: OrganizationVisibility.PRIVATE,
    })
    visibility: OrganizationVisibility;

    @Column({
        type: 'uuid',
        nullable: false,
        transformer: createValueObjectTransformer(MemberId),
        name: 'owner_member_id',
    })
    ownerMemberId: MemberId;

    static create(params: {
        id: OrganizationId;
        name: OrganizationName;
        visibility: OrganizationVisibility;
        ownerMemberId: MemberId;
    }): Organization {
        const organization = new Organization();
        organization.id = params.id;
        organization.name = params.name;
        organization.visibility = params.visibility;
        organization.ownerMemberId = params.ownerMemberId;

        return organization;
    }

    public update(params: {
        name?: OrganizationName;
        visibility?: OrganizationVisibility;
    }): Organization {
        if (params.name) {
            this.name = params.name;
        }
        if (params.visibility) {
            this.visibility = params.visibility;
        }

        return this;
    }

    public isPublic(): boolean {
        return this.visibility === OrganizationVisibility.PUBLIC;
    }
}
