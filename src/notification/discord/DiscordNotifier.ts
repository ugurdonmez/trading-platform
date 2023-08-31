import axios from "axios";
import { INotifier } from "../INotifier";

export class DiscordNotifier implements INotifier {
    private webhookUrl: string;

    constructor(webhookUrl: string) {
        console.log('Creating DiscordNotifier');
        console.log('Webhook URL:', webhookUrl);
        this.webhookUrl = webhookUrl;
    }

    async sendNotification(content: string) {

        // TODO: add nice logging

        try {
            await axios.post(this.webhookUrl, { content });
        } catch (error) {
            console.error('Error sending Discord notification:', error);
        }
    }
}
