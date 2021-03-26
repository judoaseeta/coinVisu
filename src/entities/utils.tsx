import {
    RawCoinInfo,
    RawCurrentData,
    CoinInfo,
    CurrentData,
    RawToCurrent
} from './cryptoData';
export const coinInfoParse = (rawCoinInfo: RawCoinInfo): CoinInfo => {
    const display = rawCoinInfo.DISPLAY!.USD;
    return {
        ...display,
        NAME: rawCoinInfo.CoinInfo.Name
    }
}


export const rawToCurrentData = (raw: RawCurrentData) => Object.entries(raw).reduce((acc,[key, value]) => {
    if(RawToCurrent[key]) {
        const newKey = RawToCurrent[key];
        return {
            ...acc,
            [newKey]:  value
        }
    }
    return acc;
},{} as CurrentData);