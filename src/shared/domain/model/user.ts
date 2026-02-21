import { EmailAddress } from './valueobjects/email-address';
import { Picture } from './valueobjects/picture';
import { UserId } from './valueobjects/user-id';

export class User {
  readonly userId: UserId;
  readonly email: EmailAddress;
  readonly picture: Picture;
}
