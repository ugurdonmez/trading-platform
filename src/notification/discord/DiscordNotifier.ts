import axios from "axios";
import { INotifier } from "../INotifier";
import logger from "../../logger/Logger";

export class DiscordNotifier implements INotifier {
    private webhookUrl: string;

    constructor(webhookUrl: string) {
        this.webhookUrl = webhookUrl;
    }

    async sendNotification(content: string) {
        logger.info(`Sending Discord notification: ${content}`);

        try {
            await axios.post(this.webhookUrl, { content });
            logger.info('Discord notification sent');
        } catch (error) {
            logger.error('Error sending Discord notification:', error);
        }
    }
}
