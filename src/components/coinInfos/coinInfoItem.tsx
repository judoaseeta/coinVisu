import React from 'react';
import { useHistory } from 'react-router-dom';
// components
import CoinInfoImage from './coinInfoImage';
import CoinInfoChart, { CoinInfoChartProps } from './coinInfoChart';
// entity
import { CoinInfo } from '../../entities/cryptoData';

// styles
import classnames from 'classnames/bind';
import styles from './styles/coinInfoItem.module.scss';

const cx = classnames.bind(styles);
export type CoinInfoItemProps = {
    info: CoinInfo;
    previewSrc: string;
} & Pick<CoinInfoChartProps,'histoDatas'>;
const CoinInfoItem: React.FC<CoinInfoItemProps> = ({ 
    info,
    previewSrc,
    histoDatas
}) => {
    const history = useHistory();
    const onClick: React.MouseEventHandler = React.useCallback((e) => {
        e.preventDefault();
        history.push(`/currency/${info.NAME}`);
    },[
        info.NAME,
        history
    ]);
    return (
        <tr
            className={cx('infoItem')}
            onClick={onClick}
        >
            <td
                    className={cx('data',{
                        name: true
                    })}
                >
                    <CoinInfoImage 
                        previewSrc={previewSrc}
                        loadSrc={'https://www.cryptocompare.com' +info.IMAGEURL}
                    />
                    {info.NAME}
                </td>
                <td
                    className={cx('data')}
                >{info.PRICE}</td>
                <td
                    className={cx('data')}
                >{info.VOLUMEDAYTO}</td>
                <td
                    className={cx('data')}
                >{info.MKTCAP}</td>
                <td
                    className={cx('data')}
                >
                    <CoinInfoChart 
                        histoDatas={histoDatas}
                    />
                </td>
                <td
                    className={cx('data', {
                        pct: true,
                        up: Number(info.CHANGEPCT24HOUR) > 0,
                        down:Number(info.CHANGEPCT24HOUR)  < 0,
                    })}
                >{info.CHANGEPCT24HOUR}%</td>
</tr>
    )
};

export default CoinInfoItem;
