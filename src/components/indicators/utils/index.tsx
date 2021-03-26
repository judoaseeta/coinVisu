import {
    HistoDataTimeType
} from '../../../entities/cryptoData';

export const flagToArrow = (flag: number) => {
    if(flag === 1) {
        return '▲'
    } else if(flag === 2) {
        return '▼'
    } else {
        return '≡'
    }
}
export const liveTimeToDateString = (time: number | undefined | null) => {
    const date = time ? new Date(time * 1000) : new Date();
    return `${date.getHours()}시 ${date.getMinutes()}분 ${date.getSeconds()}초`;
}
export const dataTimeToString = (date: Date, timeType: HistoDataTimeType) => {
    if(timeType === 'daily') {
        return `${date.getFullYear()}년 ${date.getMonth()+1}월 ${date.getDate()}일`
    } else if(timeType === 'hourly') {
        return `${String(date.getFullYear()).slice(2)}년 ${date.getMonth()+1}월 ${date.getDate()}일 ${date.getHours()}시`
    } else {
        return `${date.getDate()}일 ${date.getHours()}시 ${date.getMinutes()}분`;
    }
}