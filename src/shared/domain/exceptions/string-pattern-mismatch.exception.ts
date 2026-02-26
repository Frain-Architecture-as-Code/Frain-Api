import { BadRequestException } from '@nestjs/common';

export class StringPatternMismatchException extends BadRequestException {
    constructor(message: string) {
        super(message);
    }
}
