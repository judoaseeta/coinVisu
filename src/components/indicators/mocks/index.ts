import { rawToCurrentData } from '../../../entities/utils';
export const rawUp = {
    TYPE: "2",
    MARKET: "Coinbase",
    FROMSYMBOL: "BTC",
    TOSYMBOL: "USD",
    FLAGS: 1,
    PRICE: 47631.21,
    LASTUPDATE: 1614355055,
    LASTVOLUME: 0.00274374,
    LASTVOLUMETO: 130.6876561254,
    LASTTRADEID: 138717017,
    VOLUMEDAY: 25603.09078174,
    VOLUMEDAYTO: 1189414091.41376,
    VOLUME24HOUR: 38517.07431846,
    VOLUME24HOURTO: 1820994430.09096,
    VOLUMEHOUR: 2505.69806854,
    VOLUMEHOURTO: 117905058.703394,
}
const rawDown = {
    TYPE: "2",
    MARKET: "Coinbase",
    FROMSYMBOL: "BTC",
    TOSYMBOL: "USD",
    FLAGS: 2,
    PRICE: 47621.38,
    LASTUPDATE: 1614355051,
    LASTVOLUME: 0.20565071,
    LASTVOLUMETO: 9793.3706081798,
    LASTTRADEID: 138716996,
    VOLUMEDAY: 25602.77920324,
    VOLUMEDAYTO: 1189399252.45594,
    VOLUME24HOUR: 38516.76273996,
    VOLUME24HOURTO: 1820979591.13314,
    VOLUMEHOUR: 2505.38649004,
    VOLUMEHOURTO: 117890219.745573,
};
const rawSame = {
    TYPE: "2",
    MARKET: "Coinbase",
    FROMSYMBOL: "BTC",
    TOSYMBOL: "USD",
    FLAGS: 4,
    LASTUPDATE: 1614363566,
    LASTVOLUME: 0.00140428,
    LASTVOLUMETO: 66.6666342492,
    LASTTRADEID: 138768366,
    VOLUMEDAY: 28540.86181265,
    VOLUMEDAYTO: 1330203346.70925,
    VOLUME24HOUR: 37407.38628241,
    VOLUME24HOURTO: 1759171577.65095,
    VOLUMEHOUR: 258.56938476,
    VOLUMEHOURTO: 12340885.6603906,
    PRICE: 45555,
}
export const mockUpCurrent = rawToCurrentData(rawUp);
export const mockDownCurrent = rawToCurrentData(rawDown);
export const mockSameCurrent = rawToCurrentData(rawSame);

export const mockDownHistoData = {
    time:new Date(1613779200 * 1000),
    high:57528.16,
    low:54140.61,
    open:55933.47,
    volumefrom:52924.57,
    volumeto:2974872569.57,
    close:55900.84,
}

export const mockUpHistoData = {
    time:new Date(1613732200 * 1000),
    high:12.16,
    low:10.61,
    open:11.47,
    volumefrom:5.57,
    volumeto:29.3,
    close:12.08,
}