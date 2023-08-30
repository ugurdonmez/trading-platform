import { RSITracker } from "./process/RSITracker";
import { INotifier } from "./notification/INotifier";
import { DiscordNotifier } from "./notification/discord/DiscordNotifier";

import dotenv from 'dotenv';
import { ExchangeFactory } from "./factories/ExchangeFactory";
dotenv.config();

const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL!;
const notifier = new DiscordNotifier(discordWebhookUrl);

const EXCHANGE_NAME = 'bybit';
const API_KEY = process.env.BYBIT_API_KEY!;
const SECRET_KEY = process.env.BYBIT_SECRET_KEY!;

const exchangeInstance = ExchangeFactory.create(EXCHANGE_NAME, API_KEY, SECRET_KEY);

const rsiTracker = new RSITracker("GPTUSDT", notifier, "1h", exchangeInstance);

async function checkRSIAndScheduleNextCheck() {
    console.log('Checking RSI...');
    await rsiTracker.checkRSI();
    
    setTimeout(checkRSIAndScheduleNextCheck, 15 * 60 * 1000);
}

// Start the process
checkRSIAndScheduleNextCheck();

