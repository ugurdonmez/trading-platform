import { INotifier } from "../notification/INotifier";
import { calculate_rsi } from "../utils/rsiCalculator";
import { ICustomExchange } from "../exchanges/ICustomExchange";
import { IOHLCData } from "../models/IOHLCData";

export class RSITracker {
    private notifier: INotifier;
    private pair: string;
    private timeframe: string;
    private rsiOverboughtThreshold = 70;
    private exchange: ICustomExchange;

    constructor(pair: string, notifier: INotifier, timeframe: string, exchange: ICustomExchange) {
        this.pair = pair;
        this.notifier = notifier;
        this.timeframe = timeframe;
        this.exchange = exchange;
    }

    async checkRSI() {
        const ohlcData: IOHLCData[] = await this.exchange.fetchOHLCV(this.pair, this.timeframe);
        const closePrices: number[] = ohlcData.map(data => data.close);

        console.log(closePrices);

        const rsiValue = calculate_rsi(closePrices, 14); 

        console.log(rsiValue);

        if (rsiValue > this.rsiOverboughtThreshold) {
            await this.notifier.sendNotification(`RSI is overbought on ${this.pair} with value ${rsiValue}`);
        }
    }
}

