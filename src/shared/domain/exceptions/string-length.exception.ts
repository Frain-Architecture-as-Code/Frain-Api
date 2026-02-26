import { BadRequestException } from '@nestjs/common';

export class StringLengthException extends BadRequestException {
    constructor(value: string, min: number, max: number, objectName: string) {
        super(
            `${objectName} cannot have length less than ${min} or greater than ${max}. Current length: ${value.length}`,
        );
    }
}
