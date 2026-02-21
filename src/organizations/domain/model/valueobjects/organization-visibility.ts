import z from 'zod';
import { InvalidOrganizationVisibilityException } from '../../exceptions/invalid-organization-visiblity.exception';

export enum OrganizationVisibility {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}

const OrganizationVisibilityValidator = z.enum(OrganizationVisibility);

export function organizationVisibilityFromString(
  value: string,
): OrganizationVisibility {
  if (OrganizationVisibilityValidator.safeParse(value).error) {
    throw new InvalidOrganizationVisibilityException(value);
  }
  return value as OrganizationVisibility;
}
