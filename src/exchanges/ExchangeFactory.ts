import ccxt, { Exchange } from 'ccxt';
import { ExchangeConfig } from '../models/ExchangeConfig';

type ExchangeConstructor = new (config: { apiKey: string, secret: string }) => Exchange;

export class ExchangeFactory {
    private static exchangeMap: { [key: string]: ExchangeConstructor } = {
        'bybit': ccxt.bybit,
        'binance': ccxt.binance,
        // Add other exchanges here as needed...
    };

    static create(config: ExchangeConfig): Exchange {
        const ExchangeClass = this.exchangeMap[config.name.toLowerCase()];

        if (!ExchangeClass) {
            throw new Error(`Unsupported exchange: ${config.name}`);
        }

        return new ExchangeClass({
            apiKey: config.apiKey,
            secret: config.secret
        });
    }
}
