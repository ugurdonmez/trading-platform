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

    public getPair():string {
        return this.pair;
    }

    // TODO: save IOLC data and fecth after last saved data
    async checkRSI() {
        // TODO: add nice logging
        // TODO: add error handling
        const ohlcData: IOHLCData[] = await this.exchange.fetchOHLCV(this.pair, this.timeframe);

        const closePrices: number[] = ohlcData.map(data => data.close);
        const rsiValue = calculate_rsi(closePrices, 14); 

        if (rsiValue > this.rsiOverboughtThreshold) {
            await this.notifier.sendNotification(`RSI is overbought on ${this.pair} with value ${rsiValue}`);
        }
    }
}

