import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from './infrastructure/security/auth.guard';
import { UserContext } from './infrastructure/security/user-context';

@Module({
    imports: [
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                global: true,
                secret: configService.get<string>('JWT_SECRET'),
            }),
        }),
    ],
    providers: [AuthGuard, UserContext],
    exports: [AuthGuard, JwtModule, UserContext],
})
export class SharedModule {}
