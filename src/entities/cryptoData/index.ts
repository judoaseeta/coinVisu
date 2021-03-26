export interface RawHistoData {
    time: number;
    high: number;
    low: number;
    open: number;
    close: number;
    volumefrom: number;
    volumeto: number;
    conversionType: string;
    conversionSymbol: string;
}
export interface HistoData {
    time: Date;
    high: number;
    low: number;
    open: number;
    close: number;
    volumefrom: number;
    volumeto: number;
}
export interface RawCurrentData {
    TYPE: string;
    MARKET: string;
    FROMSYMBOL: string;
    TOSYMBOL: string;
    FLAGS: number;
    PRICE: number;
    LASTUPDATE: number;
    LASTVOLUME: number;
    LASTVOLUMETO: number;
    LASTTRADEID: number;
    VOLUMEDAY: number;
    VOLUMEDAYTO: number;
    VOLUME24HOUR: number;
    VOLUME24HOURTO: number;
    VOLUMEHOUR: number;
    VOLUMEHOURTO: number;
}
export interface CurrentData {
    market: string;
    fsym: string;
    tsym: string;
    flag: number;
    price?: number;
    lastUpdate: number;
    lastVolume: number;
}
export const RawToCurrent: Record<string,string> =  {
    "MARKET" : 'market',
    "FROMSYMBOL" : 'fsym',
    "TOSYMBOL" : 'tsym',
    "FLAGS" : 'flag',
    "PRICE" : 'price',
    "LASTUPDATE" : 'lastUpdate',
    "LASTVOLUME" : 'lastVolume'
}
export interface CoinData {
    id: string;
    createdOn: number;
    name: string;
    symbol: string;
    coinName: string;
}   
interface CoinDisplayInfo {
    FROMSYMBOL: string;
    TOSYMBOL: string;
    MARKET: string;
    PRICE:  string;
    LASTUPDATE: string;
    LASTVOLUME: string;
    LASTVOLUMETO: string;
    LASTTRADEID: string;
    VOLUMEDAY: string;
    VOLUMEDAYTO: string;
    VOLUME24HOUR: string;
    VOLUME24HOURTO: string;
    OPENDAY: string;
    HIGHDAY: string;
    LOWDAY: string;
    OPEN24HOUR: string;
    HIGH24HOUR: string;
    LOW24HOUR:  string;
    LASTMARKET: string;
    VOLUMEHOUR: string;
    VOLUMEHOURTO: string;
    OPENHOUR: string;
    HIGHHOUR: string;
    LOWHOUR: string;
    TOPTIERVOLUME24HOUR: string;
    TOPTIERVOLUME24HOURTO: string;
    CHANGE24HOUR: string;
    CHANGEPCT24HOUR: string;
    CHANGEDAY: string;
    CHANGEPCTDAY: string;
    CHANGEHOUR: string;
    CHANGEPCTHOUR: string;
    CONVERSIONTYPE: string;
    CONVERSIONSYMBOL: string;
    SUPPLY: string;
    MKTCAP: string;
    MKTCAPPENALTY: string;
    TOTALVOLUME24H: string;
    TOTALVOLUME24HTO: string;
    TOTALTOPTIERVOLUME24H: string;
    TOTALTOPTIERVOLUME24HTO: string;
    IMAGEURL: string;
}
export interface RawCoinInfo {
    CoinInfo: {
        Id: string;
        Name: string;
        FullName: string;
        Internal: string;
        ImageUrl: string;
        Url: string;
        Algorithm: string;
        ProofType: string;
        Rating: Object
        NetHashesPerSecond:number;
        BlockNumber: number;
        BlockTime: number;
        BlockReward: number;
        AssetLaunchDate:string;
        MaxSupply: number;
        Type:number;
        DocumentType: string;
    }
    DISPLAY?: {
        USD: CoinDisplayInfo;
    };
}


export interface CoinInfo extends CoinDisplayInfo {
    NAME: string;   
};


export interface ExchangeData {
    exchange: string;
    fromSymbol: string;
    toSymbol: string;
    volume24h: number;
    volume24hTo: number;
    price: number;
    lastUpdateTs: number;
    exchangeGradePoints: number;
    exchangeGrade: string;
}

export interface PairData {
    SYMBOL:  string;
    SUPPLY: number;
    MKTCAPPENALTY: number;
    FULLNAME:  string;
    NAME:  StorageManager;
    ID:  string;
    VOLUME24HOURTO: number;
}
export interface ToPairData {
    exchange:  string;
    fromSymbol: string;
    toSymbol: string;
    volume24h: number;
    volume24hTo: number;
    price:number;
    lastUpdateTs: number;
    exchangeGradePoints: number;
    exchangeGrade: string;
}
export type HistoDataTimeType = 'daily' | 'hourly' | 'minute';
