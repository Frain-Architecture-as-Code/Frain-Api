import { EmailAddress } from './valueobjects/email-address';
import { Picture } from './valueobjects/picture';
import { UserId } from './valueobjects/user-id';
import { UserName } from './valueobjects/user-name';

export class User {
  readonly userId: UserId;
  readonly email: EmailAddress;
  readonly picture: Picture;
  readonly username: UserName;

  constructor(
    userId: UserId,
    email: EmailAddress,
    picture: Picture,
    username: UserName,
  ) {
    this.userId = userId;
    this.email = email;
    this.picture = picture;
    this.username = username;
  }
}
