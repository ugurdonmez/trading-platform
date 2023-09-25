import * as talib from 'ta-lib';

// TODO: check closing prices ascending or descending
// TOOD: get object instead of array
export const calculate_rsi = (closePrices: number[], rsiLength: number) => {

    //console.log(`Calculating RSI for ${closePrices.length} prices with length ${rsiLength}`);
    //console.log(closePrices.join(', '));


    const rsi = talib.RSI(closePrices.reverse(), rsiLength);

    //console.log(`RSI calculated: ${rsi}`);

    return rsi[0];
}
