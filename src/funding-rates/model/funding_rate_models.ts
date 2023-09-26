export interface FundingRate {
    symbol: string;
    symbolLogo: string;
    status: number;
    uIndexPrice: number,
    uPrice: number;
    cIndexPrice: number;
    cPrice: number;
    uMarginList: Margin[];
    cMarginList: Margin[];
}

export interface Margin {
    rate: number;
    exchangeLogo: string;
    exchangeName: string;
    status: number;
    nextFundingTime: number;
}