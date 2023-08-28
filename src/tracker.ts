import { RSITracker } from "./process/RSITracker";
import { INotifier } from "./notification/INotifier";
import { DiscordNotifier } from "./notification/discord/DiscordNotifier";

import dotenv from 'dotenv';
dotenv.config();

const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL!;
const notifier = new DiscordNotifier(discordWebhookUrl);
const rsiTracker = new RSITracker("GPTUSDT", notifier, "1h");

setInterval(async () => {
    await rsiTracker.checkRSI();
}, 60000);
