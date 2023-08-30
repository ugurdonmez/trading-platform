import { binance, Exchange } from 'ccxt';
import { ICustomExchange } from '../ICustomExchange';
import { IOHLCData } from '../../models/IOHLCData';

export class BinanceExchange implements ICustomExchange {
    private exchange: Exchange;

    constructor(apiKey: string, secret: string) {
        this.exchange = new binance({ apiKey, secret });
    }

    async fetchOHLCV(symbol: string, timeframe: string): Promise<IOHLCData[]> {
        const raw = await this.exchange.fetchOHLCV(symbol, timeframe);
        return raw.map(data => ({
            timestamp: data[0],
            open: data[1],
            high: data[2],
            low: data[3],
            close: data[4],
            volume: data[5]
        }));
    }
}
