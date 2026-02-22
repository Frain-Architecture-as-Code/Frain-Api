export class StringLengthException extends Error {
    constructor(value: string, min: number, max: number, objectName: string) {
        super(
            `${objectName} cannot have length less than ${min} or greater than ${max}. Current length: ${value.length}`,
        );
    }
}
