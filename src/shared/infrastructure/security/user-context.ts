import { Inject, Injectable, Scope } from '@nestjs/common';
import { EmailAddress } from 'src/shared/domain/model/valueobjects/email-address';
import { UserId } from 'src/shared/domain/model/valueobjects/user-id';
import { UserName } from 'src/shared/domain/model/valueobjects/user-name';
import { User } from 'src/shared/domain/model/user';
import { Picture } from 'src/shared/domain/model/valueobjects/picture';
import { REQUEST } from '@nestjs/core';

export interface JwtPayload {
  email: string;
  username: string;
  picture: string;
  sub: string;
  iat: number;
  exp: number;
}

@Injectable({ scope: Scope.REQUEST })
export class UserContext {
  constructor(@Inject(REQUEST) private readonly request: Request) {}

  get user(): User {
    const payload = this.request['user'] as JwtPayload;

    const userId = UserId.fromString(payload.sub);
    const userEmail = EmailAddress.fromString(payload.email);
    const username = UserName.fromString(payload.username);
    const picture = Picture.fromString(payload.picture);

    return new User(userId, userEmail, picture, username);
  }
}
