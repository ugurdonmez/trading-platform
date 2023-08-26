import axios from 'axios';

export class DiscordNotifier {
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
