import axios from "axios";
import { FundingRate, FundingRateAggregation } from "../model/funding_rate_models";

async function getFundingRates() {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            coinglassSecret: '3235f1d7af6f41f1837fd7a5ac611c1e'
        },
        url: 'https://open-api.coinglass.com/public/v2/funding'
    };

    try {
        const response = await axios(options);
        const fundingRates: FundingRate[] = response.data.data;

        let btcFundingRate = fundingRates.find(f => f.symbol === 'TRB');

        // do it for all symbols
        fundingRates.forEach(f => {
            f.uMarginList = f.uMarginList.filter(m => m.status === 1 || m.status === 2);
            f.uMarginList = f.uMarginList.filter(m => m.exchangeName === 'Binance' || m.exchangeName === 'Bybit' || m.exchangeName === 'OKX');
            f.cMarginList = [];
            f.symbolLogo = '';
        });

        const aggregatedMargins: FundingRateAggregation[] = [];

        fundingRates.forEach((crypto: any) => {
          crypto.uMarginList.forEach((margin: any) => {
            const aggregatedMargin: FundingRateAggregation = {
              symbol: crypto.symbol,
              rate: margin.rate,
              exchangeName: margin.exchangeName,
              status: margin.status,
              nextFundingTime: margin.nextFundingTime,
            };
            aggregatedMargins.push(aggregatedMargin);
          });
        });
    
    
        console.log(JSON.stringify (aggregatedMargins));
    } catch (error) {
        console.error(error);
    }
}

getFundingRates();