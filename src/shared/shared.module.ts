import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'src/env';
import { AuthGuard } from './infrastructure/security/auth.guard';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: env.jwtSecret,
    }),
  ],
  providers: [AuthGuard],
  exports: [AuthGuard],
})
export class SharedModule {}
