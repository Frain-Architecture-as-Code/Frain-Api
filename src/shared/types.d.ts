import { JwtPayload } from './infrastructure/security/user-context';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
