import axios from "axios";
import { FundingRate } from "../model/funding_rate_models";

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

        const btcFundingRate = fundingRates.find(f => f.symbol === 'BTC');

        console.log(JSON.stringify(btcFundingRate));

        // console.log(JSON.stringify (fundingRates));
    } catch (error) {
        console.error(error);
    }
}

getFundingRates();