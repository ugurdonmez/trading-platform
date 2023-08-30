export interface RsiTrackerConfig {
    symbol: string;
    timeframe: string;
    rsiPeriod: number;
}

export interface TradingPairConfig {
    symbol: string;
    timeframe: string;
    rsiOverbought: number;
    profitTarget: number;
}

export interface AppConfig {
    rsiTrackers: RsiTrackerConfig[];
    tradingPairs: TradingPairConfig[];
}
