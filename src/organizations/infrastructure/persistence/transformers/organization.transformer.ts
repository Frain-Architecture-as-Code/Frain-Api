import { MemberId } from 'src/organizations/domain/model/valueobjects/member-id';
import { OrganizationId } from 'src/organizations/domain/model/valueobjects/organization-id';
import { OrganizationName } from 'src/organizations/domain/model/valueobjects/organization-name';
import { ValueTransformer } from 'typeorm';

export const organizationIdTransformer: ValueTransformer = {
  to(value: OrganizationId): string {
    return value.toString();
  },
  from(value: string): OrganizationId {
    return OrganizationId.fromString(value);
  },
};

export const organizationNameTransformer: ValueTransformer = {
  to(value: OrganizationName): string {
    return value.toString();
  },
  from(value: string): OrganizationName {
    return OrganizationName.fromString(value);
  },
};

export const memberIdTransformer: ValueTransformer = {
  to(value: MemberId): string {
    return value.toString();
  },
  from(value: string): MemberId {
    return MemberId.fromString(value);
  },
};
