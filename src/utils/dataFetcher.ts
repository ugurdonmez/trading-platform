import ccxt from 'ccxt';

const exchange = new ccxt.bybit({
    'apiKey': 'YOUR_API_KEY',
    'secret': 'YOUR_SECRET_KEY',
});

export const fetch_data = async (symbol: string, timeframe: string) => {
    const ohlc = await exchange.fetchOHLCV(symbol, timeframe);
    const close = ohlc.map(x => x[4]);
    return close;
}
