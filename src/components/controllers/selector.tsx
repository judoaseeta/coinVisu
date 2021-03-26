import React from 'react';
import { HistoDataTimeType }  from '../../entities/cryptoData';
//styles
import classnames from 'classnames/bind';
import styles from './styles/selector.module.scss';

const cx = classnames.bind(styles);

export interface SelectorProps {
    timeType:HistoDataTimeType;
    setTime: (timeType: HistoDataTimeType) => void;
}
const Selector: React.FC<SelectorProps> = ({
    timeType,
    setTime
}) => 
<div
    className={cx('container')}
>   
    <div
        className={cx('buttons')}
    >
        <button
            className={cx('button',{
                selected: timeType === 'daily'
            })}
            onClick={() => setTime('daily')}
        >일간 데이터</button>
        <button
            className={cx('button',{
                selected: timeType === 'hourly'
            })}
            onClick={() => setTime('hourly')}
        >시간당 데이터</button>
        <button
            className={cx('button',{
                selected: timeType === 'minute'
            })}
            onClick={() => setTime('minute')}
        >분당 데이터</button>
    </div>
</div>;

export default Selector;