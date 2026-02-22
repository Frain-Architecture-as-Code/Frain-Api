import { ValueTransformer } from 'typeorm';
import { StringValueObject, ValueObjectStatic } from './generics';

export function createValueObjectTransformer<T extends StringValueObject>(
  voClass: ValueObjectStatic<T>,
): ValueTransformer {
  return {
    to(value: T | null): string | null {
      return value ? value.toString() : null;
    },
    from(value: string | null): T | null {
      return value ? voClass.fromString(value) : null;
    },
  };
}
