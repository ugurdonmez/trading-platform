import { RSITracker } from "./process/RSITracker";
import { DiscordNotifier } from "./notification/discord/DiscordNotifier";
import { ExchangeFactory } from "./exchanges/ExchangeFactory";
import { ExchangeConfig } from "./models/ExchangeConfig";
import * as config from '../config.json';

import dotenv from 'dotenv';
dotenv.config();

const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL!;
const notifier = new DiscordNotifier(discordWebhookUrl);

const API_KEY = process.env.BYBIT_API_KEY!;
const SECRET_KEY = process.env.BYBIT_SECRET_KEY!;

const bybitConfig: ExchangeConfig = {
    name: 'bybit',
    apiKey: API_KEY,
    secret: SECRET_KEY,
};

const bybitExchange = ExchangeFactory.create(bybitConfig);

// TODO: get exchange also from config
const rsiTrackers = config.rsiTrackers.map(trackerConfig => new RSITracker(trackerConfig.symbol, notifier, trackerConfig.timeframe, bybitExchange));

async function checkAllRSIs() {
    for (const rsiTracker of rsiTrackers) {
        console.log(`Checking RSI for ${rsiTracker.getPair()}`);
        await rsiTracker.checkRSI();
    }
}

setInterval(checkAllRSIs, 15 * 60 * 1000);
checkAllRSIs();