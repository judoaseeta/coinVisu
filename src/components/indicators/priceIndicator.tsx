import React from 'react';
import classnames from 'classnames/bind';

// entity 
import {
    CurrentData
} from '../../entities/cryptoData';
// utils
import {
    flagToArrow,
    liveTimeToDateString
} from './utils';
// styles
import styles from './styles/priceIndicator.module.scss';
const cx = classnames.bind(styles);

export interface PriceIndicatorProps {
    data: CurrentData;
}

const PriceIndicator: React.FC<PriceIndicatorProps> =({ 
    data : {
        flag,
        fsym,
        tsym,
        price,
        lastUpdate,
        lastVolume
    }
}) =>
<>
    <h2
        className={cx('symbols')}
    >    
        {`${fsym} - ${tsym}`}</h2>
    <h3
        className={cx('price', {
            up: flag === 1,
            down: flag === 2,
        })}
    >
        <span
            className={cx('arrow', {
                up: flag === 1,
                down: flag === 2,
            })}
        >
            {flagToArrow(flag)}
        </span>
        {price}
    </h3>
    <div>
        <p
            className={cx('update')}
        >마지막 업데이트: {liveTimeToDateString(lastUpdate)}</p>
        <p
            className={cx('volume')}
        >마지막 거래량: {lastVolume}</p>
    </div>
</>

export default PriceIndicator;
