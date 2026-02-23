export interface StringValueObject {
    toString(): string;
}

export interface ValueObjectStatic<T extends StringValueObject> {
    fromString(value: string): T;
}
