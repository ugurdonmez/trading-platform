import ccxt, { Exchange } from 'ccxt';

export class ExchangeFactory {
    static create(name: string, apiKey: string, secretKey: string): Exchange {
        switch (name.toLowerCase()) {
            case 'bybit':
                return new ccxt.bybit({
                    apiKey,
                    secret: secretKey
                });
            // Add cases for other exchanges here...
            default:
                throw new Error('Unsupported exchange');
        }
    }
}
