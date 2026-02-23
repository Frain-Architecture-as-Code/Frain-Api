import { HttpException, HttpStatus } from '@nestjs/common';

export class InsufficientPermissionException extends HttpException {
    constructor(message: string) {
        super(message, HttpStatus.FORBIDDEN);
    }
}
