import { INotifier } from "../notification/INotifier";
import { fetch_data } from "../utils/dataFetcher";
import { calculate_rsi } from "../utils/rsiCalculator";

export class RSITracker {
    private notifier: INotifier;
    private pair: string;
    private timeframe: string;
    private rsiOverboughtThreshold = 70;

    constructor(pair: string, notifier: INotifier, timeframe: string) {
        this.pair = pair;
        this.notifier = notifier;
        this.timeframe = timeframe;
    }

    async checkRSI() {
        const closePrices = await fetch_data(this.pair, this.timeframe);
        const rsiValue = calculate_rsi(closePrices, 14); 

        if (rsiValue > this.rsiOverboughtThreshold) {
            await this.notifier.sendNotification(`RSI is overbought on ${this.pair} with value ${rsiValue}`);
        }
    }
}

