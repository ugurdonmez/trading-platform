import { IOHLCData } from "../models/IOHLCData";

export interface ICustomExchange {
    fetchOHLCV(symbol: string, timeframe: string): Promise<IOHLCData[]>;
}
