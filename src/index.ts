import { Trader } from './trader';
import * as fs from 'fs';
import { DiscordNotifier } from './utils/discordNotifier';

const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

const discordWebhookUrl = 'YOUR_DISCORD_WEBHOOK_URL_HERE';
const notifier = new DiscordNotifier(discordWebhookUrl);


const traders = config.tradingPairs.map(pair => new Trader(pair.symbol, pair.timeframe, pair.rsiOverbought, pair.profitTarget, notifier));

(async function main() {
    while (true) {
        for (const trader of traders) {
            await trader.checkEntryExit();
        }
        await new Promise(resolve => setTimeout(resolve, 60 * 60 * 1000));  // Check every hour
    }
})();

