export class NotificationMessage {
    private constructor(private readonly value: string) {}

    public static fromString(message: string) {
        if (!message || message.trim() === '') {
            throw new Error('Notification message cannot be blank');
        }
        return new NotificationMessage(message);
    }

    public toString(): string {
        return this.value;
    }
}
