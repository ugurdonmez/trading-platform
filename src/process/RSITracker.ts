import { Exchange } from "ccxt";
import { INotifier } from "../notification/INotifier";
import { fetch_data } from "../utils/dataFetcher";
import { calculate_rsi } from "../utils/rsiCalculator";

export class RSITracker {
    private notifier: INotifier;
    private pair: string;
    private timeframe: string;
    private rsiOverboughtThreshold = 70;
    private exchange: Exchange;

    constructor(pair: string, notifier: INotifier, timeframe: string, exchange: Exchange) {
        this.pair = pair;
        this.notifier = notifier;
        this.timeframe = timeframe;
        this.exchange = exchange;
    }

    async checkRSI() {
        const closePrices = await fetch_data(this.exchange, this.pair, this.timeframe);

        console.log(closePrices);

        const rsiValue = calculate_rsi(closePrices, 14); 

        console.log(rsiValue);

        if (rsiValue > this.rsiOverboughtThreshold) {
            await this.notifier.sendNotification(`RSI is overbought on ${this.pair} with value ${rsiValue}`);
        }
    }
}

