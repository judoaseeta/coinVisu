import React from 'react';
// entity
import {
    HistoData,
    HistoDataTimeType
} from '../../entities/cryptoData';

// util
import {
    flagToArrow,
    dataTimeToString
} from './utils'
// styles
import classnames from 'classnames/bind';
import styles from './styles/dataIndicator.module.scss';
const cx = classnames.bind(styles);

export interface DataIndicatorProps {
    data: HistoData;
    timeType: HistoDataTimeType
}
const DataIndicator:React.FC<DataIndicatorProps> = ({
    data,
    timeType
}) => {
    const flag = data.close > data.open ? 1 : data.close < data.open ? 2 : 4;
    return (
    <>
        <h3
            className={cx('price', {
                up: flag === 1,
                down: flag === 2,
            })}
        >{flagToArrow(flag)}</h3>
        <ul
            className={cx('dataList')}
        >
            <li>고가: {data.high}</li>
            <li>저가: {data.low}</li>
            <li>시가: {data.open}</li>
            <li>종가: {data.close}</li>
            <li >시간: <span className={cx('time')}>{dataTimeToString(data.time, timeType)}</span></li>
            <li>거래량: {data.volumefrom}</li>
        </ul>
    </>
    )
};

export default DataIndicator;
