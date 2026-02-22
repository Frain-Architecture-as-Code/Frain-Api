export class InsufficientPermissionException extends Error {
  constructor(message: string) {
    super(message);
  }
}
