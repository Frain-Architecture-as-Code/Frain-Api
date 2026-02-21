import { Injectable } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { EmailAddress } from 'src/shared/domain/model/valueobjects/email-address';
import { UserId } from 'src/shared/domain/model/valueobjects/user-id';
import { UserName } from 'src/shared/domain/model/valueobjects/user-name';
import { User } from 'src/shared/domain/model/user';
import { Picture } from 'src/shared/domain/model/valueobjects/picture';

export interface JwtPayload {
  email: string;
  username: string;
  picture: string;
  sub: string;
  iat: number;
  exp: number;
}

@Injectable()
export class UserContext {
  constructor(private authGuard: AuthGuard) {}

  buildUser(user: JwtPayload): User {
    console.log(user);
    const userId = UserId.fromString(user.sub);
    const userEmail = EmailAddress.fromString(user.email);
    const username = UserName.fromString(user.username);
    const picture = Picture.fromString(user.picture);

    return new User(userId, userEmail, picture, username);
  }
}
