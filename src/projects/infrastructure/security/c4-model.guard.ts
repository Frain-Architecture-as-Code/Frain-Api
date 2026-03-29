import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ApiKeyGuard } from './api-key.guard';
import { AuthGuard } from '../../../shared/infrastructure/security/auth.guard';

@Injectable()
export class C4ModelGuard implements CanActivate {
    constructor(
        private apiKeyGuard: ApiKeyGuard,
        private authGuard: AuthGuard,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const hasApiKey = await this.apiKeyGuard
            .canActivate(context)
            .catch(() => false);
        if (hasApiKey) return true;
        return this.authGuard.canActivate(context);
    }
}
