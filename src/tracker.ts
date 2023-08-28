import { RSITracker } from "./process/RSITracker";
import { INotifier } from "./notification/INotifier";
import {DiscordNotifier} from "./notification/discord/DiscordNotifier";

const discordWebhookUrl = 'YOUR_DISCORD_WEBHOOK_URL_HERE';
const notifier = new DiscordNotifier(discordWebhookUrl);
const rsiTracker = new RSITracker("GPTUSDT", notifier, "1h");

setInterval(async () => {
    await rsiTracker.checkRSI();
}, 60000);
