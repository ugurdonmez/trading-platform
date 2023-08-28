export interface INotifier {
    sendNotification(content: string): Promise<void>;
}