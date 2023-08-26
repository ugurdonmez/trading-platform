import * as talib from 'ta-lib';

export const calculate_rsi = (closePrices: number[], rsiLength: number) => {
    const rsi = talib.RSI(closePrices, rsiLength);
    return rsi[rsi.length - 1];
}
