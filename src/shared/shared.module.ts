import { Module } from '@nestjs/common';
import { UserContext } from './infrastructure/security/user-context';

@Module({
  providers: [UserContext],
})
export class SharedModule {}
