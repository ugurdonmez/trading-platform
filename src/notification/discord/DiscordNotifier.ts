import axios from "axios";
import { INotifier } from "../INotifier";

export class DiscordNotifier implements INotifier {
    private webhookUrl: string;

    constructor(webhookUrl: string) {
        this.webhookUrl = webhookUrl;
    }

    async sendNotification(content: string) {
        try {
            await axios.post(this.webhookUrl, { content });
        } catch (error) {
            console.error('Error sending Discord notification:', error);
        }
    }
}
