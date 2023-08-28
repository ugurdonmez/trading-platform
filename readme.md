# Trading Platform - RSI Tracker

This project provides tools to track the Relative Strength Index (RSI) of specific trading pairs on the Bybit exchange. It sends notifications when the RSI exceeds specified thresholds, offering potential trading signals.

## Features

- **Data Fetching**: Fetches historical OHLC data from the Bybit exchange for specified trading pairs and timeframes.
  
- **RSI Calculation**: Computes the RSI value based on the fetched historical data.
  
- **Notification**: Sends notifications to a Discord channel when the RSI value for a trading pair goes above a certain overbought threshold.

## Components

### INotifier Interface

An interface that defines the structure for notifier classes. Currently, we have an implementation for Discord, but this design allows for easy extensions for other notification platforms.

### DiscordNotifier Class

Sends notifications to a specified Discord channel using webhooks.

### RSITracker Class

Monitors the RSI of a specified trading pair on the Bybit exchange and sends notifications when conditions are met.

## Usage

1. **Setup**:
   - Replace `'YOUR_API_KEY'` and `'YOUR_SECRET_KEY'` in `dataFetcher.ts` with your Bybit API credentials.
   - Replace `'YOUR_DISCORD_WEBHOOK_URL_HERE'` with your Discord webhook URL.

2. **Running the RSI Tracker**:
   - run tracket.ts

