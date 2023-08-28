import { Exchange } from 'ccxt';

export const fetch_data = async (exchange: Exchange, symbol: string, timeframe: string) => {
    const ohlc = await exchange.fetchOHLCV(symbol, timeframe);
    const close = ohlc.map(x => x[4]);
    return close;
}
