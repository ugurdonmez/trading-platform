import { ExchangeConfig } from '../models/ExchangeConfig';
import { ICustomExchange } from './ICustomExchange';
import { BinanceExchange } from './binance/BinanceExchange';
import { BybitExchange } from './bybit/BybitExchange';

type CustomExchangeConstructor = new (apiKey: string, secret: string) => ICustomExchange;

export class ExchangeFactory {
    private static exchangeMap: { [key: string]: CustomExchangeConstructor } = {
        'bybit': BybitExchange,
        'binance': BinanceExchange,
    };

    static create(config: ExchangeConfig): ICustomExchange {
        const CustomExchangeClass = this.exchangeMap[config.name.toLowerCase()];

        if (!CustomExchangeClass) {
            throw new Error(`Unsupported exchange: ${config.name}`);
        }

        return new CustomExchangeClass(config.apiKey, config.secret);
    }
}
