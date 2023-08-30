import { RSITracker } from "./process/RSITracker";
import { DiscordNotifier } from "./notification/discord/DiscordNotifier";

import dotenv from 'dotenv';
import { ExchangeFactory } from "./exchanges/ExchangeFactory";
import { ExchangeConfig } from "./models/ExchangeConfig";
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


const rsiTracker = new RSITracker("GPTUSDT", notifier, "1h", bybitExchange);

async function checkRSIAndScheduleNextCheck() {
    console.log('Checking RSI...');
    await rsiTracker.checkRSI();
    
    setTimeout(checkRSIAndScheduleNextCheck, 15 * 60 * 1000);
}

// Start the process
checkRSIAndScheduleNextCheck();

