import ccxt from 'ccxt';
import { calculate_rsi } from './utils/rsiCalculator';
import { INotifier } from './notification/INotifier';

const exchange = new ccxt.bybit({
    'apiKey': 'YOUR_API_KEY',
    'secret': 'YOUR_SECRET_KEY',
});


// TODO: refactor this class to be more generic
export class Trader {
    symbol: string;
    timeframe: string;
    rsiOverbought: number;
    profitTarget: number;
    entryPrice: number | null = null;
    private notifier: INotifier;

    constructor(symbol: string, timeframe: string, rsiOverbought: number, profitTarget: number, notifier: INotifier) {
        this.symbol = symbol;
        this.timeframe = timeframe;
        this.rsiOverbought = rsiOverbought;
        this.profitTarget = profitTarget;
        this.notifier = notifier;
    }

    // TODO: fix logging and console errors
    async checkEntryExit() {
        // const closePrices = await fetch_data(this.symbol, this.timeframe);
        // const last_rsi = calculate_rsi(closePrices, 14);
        // const lastClosePrice = closePrices.slice(-1)[0];

        // if (last_rsi > this.rsiOverbought) {
        //     const order = await exchange.createMarketSellOrder(this.symbol, 1);
        //     this.entryPrice = order.price;
        //     console.log("Entered short position at:", order.price);
        //     await this.notifier.sendNotification(`Entered short position for ${this.symbol} at ${order.price}. RSI: ${last_rsi}`);
        // } else if (last_rsi < 30) {  // Example threshold for oversold. You can adjust this.
        //     await this.notifier.sendNotification(`RSI is oversold for ${this.symbol}. RSI: ${last_rsi}`);
        // } else if (this.entryPrice && ((this.entryPrice - lastClosePrice) / this.entryPrice) >= this.profitTarget) {
        //     await exchange.createMarketBuyOrder(this.symbol, 1);
        //     this.entryPrice = null;
        //     console.log("Closed short position");
        //     await this.notifier.sendNotification(`Closed short position for ${this.symbol}. Profit: ${(this.entryPrice - lastClosePrice) / this.entryPrice}`);
        // }
    }

}
