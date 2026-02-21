import { Injectable } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { EmailAddress } from 'src/shared/domain/model/valueobjects/email-address';
import { UserId } from 'src/shared/domain/model/valueobjects/user-id';

@Injectable()
export class UserContext {
  constructor(private authGuard: AuthGuard) {}

  buildUser(user: any) {
    console.log(user);
    const userEmail = EmailAddress.fromString(user.email);
    const userId = UserId.fromString(user.id);
    return { id: userId, email: userEmail };
  }
}
