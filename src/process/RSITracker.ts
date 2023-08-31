import { INotifier } from "../notification/INotifier";
import { calculate_rsi } from "../utils/rsiCalculator";
import { ICustomExchange } from "../exchanges/ICustomExchange";
import { IOHLCData } from "../models/IOHLCData";
import logger from "../logger/Logger";

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
        logger.info(`Checking RSI for ${this.pair}`);
        // TODO: add error handling
        const ohlcData: IOHLCData[] = await this.exchange.fetchOHLCV(this.pair, this.timeframe);

        const closePrices: number[] = ohlcData.map(data => data.close);
        const rsiValue = calculate_rsi(closePrices, 14);
        
        logger.info(`RSI is ${rsiValue} on ${this.pair}`);

        if (rsiValue > this.rsiOverboughtThreshold) {
            logger.info(`RSI is overbought on ${this.pair} with value ${rsiValue}`);
            await this.notifier.sendNotification(`RSI is overbought on ${this.pair} with value ${rsiValue}`);
        }
    }
}

