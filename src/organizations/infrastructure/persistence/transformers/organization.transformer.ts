import { MemberId } from 'src/organizations/domain/model/valueobjects/member-id';
import { OrganizationId } from 'src/organizations/domain/model/valueobjects/organization-id';
import { OrganizationName } from 'src/organizations/domain/model/valueobjects/organization-name';
import { ValueTransformer } from 'typeorm';

export const organizationIdTransformer: ValueTransformer = {
  to(value: OrganizationId): string {
    return value.value.toString();
  },
  from(value: string): OrganizationId {
    return OrganizationId.schema.parse(value);
  },
};

export const organizationNameTransformer: ValueTransformer = {
  to(value: OrganizationName): string {
    return value.value.toString();
  },
  from(value: string): OrganizationName {
    return OrganizationName.schema.parse(value);
  },
};

export const memberIdTransformer: ValueTransformer = {
  to(value: MemberId): string {
    return value.value.toString();
  },
  from(value: string): MemberId {
    return OrganizationId.schema.parse(value);
  },
};
