import { Column, Entity, PrimaryColumn } from 'typeorm';
import { OrganizationId } from './valueobjects/organization-id';
import {
  memberIdTransformer,
  organizationIdTransformer,
  organizationNameTransformer,
} from 'src/organizations/infrastructure/persistence/transformers/organization.transformer';
import { OrganizationName } from './valueobjects/organization-name';
import { OrganizationVisibility } from './valueobjects/organization-visibility';
import { MemberId } from './valueobjects/member-id';

@Entity()
export class Organization {
  @PrimaryColumn({
    type: 'uuid',
    transformer: organizationIdTransformer,
  })
  id: OrganizationId;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    transformer: organizationNameTransformer,
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
    transformer: memberIdTransformer,
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
}
