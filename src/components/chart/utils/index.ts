import { 
    HistoData,
    HistoDataTimeType
} from '../../../entities/cryptoData';
import {
    ScaleLogarithmic,
    ScaleLinear
} from 'd3-scale';
export const getCandleYposStart = (data: HistoData ) => data.close > data.open ? data.close : data.open;
export const getCandleYposEnd = (data: HistoData ) => data.close < data.open ? data.close: data.open;

export const dataTimeToString = (date: Date, timeType: HistoDataTimeType) => {
    if(timeType === 'daily') {
        return `${String(date.getFullYear()).slice(2)}년 ${date.getMonth()+1}월 ${date.getDate()}일`
    } else if(timeType === 'hourly') {
        return `${String(date.getFullYear()).slice(2)}년 ${date.getMonth()+1}월 ${date.getDate()}일 ${date.getHours()}시`
    } else {
        return `${date.getDate()}일 ${date.getHours()}시 ${date.getMinutes()}분`;
    }
}

export function isLogScale(scale: ScaleLogarithmic<number,number> | ScaleLinear<number,number>): scale is ScaleLogarithmic<number,number> {
    return !!(scale as ScaleLogarithmic<number,number>).base ? true : false;
}