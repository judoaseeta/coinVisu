import React from 'react';
// entity
import { AggPortfolio } from '../../entities/api/portfolio';
// styles
import classnames from 'classnames/bind';
import styles from './styles/portfolio.module.scss';
const cx = classnames.bind(styles);


export interface PortFolioProps {
    currentPortFolio: AggPortfolio | null;
    currentPrice: number;
    isLogin: boolean;
    symbol:string;
}
const PortFolio: React.FC<PortFolioProps> = ({
    currentPortFolio,
    currentPrice,
    isLogin,
    symbol
}) => {
    const profit = React.useMemo(() => {
        if(currentPortFolio) {
            const { amount, avgPrice } = currentPortFolio;
            return Number((currentPrice - avgPrice) * amount);
        }
    },[
        currentPrice,
        currentPortFolio
    ]);
    const profitage = React.useMemo(() => {
        if(currentPortFolio) {
            const { avgPrice } = currentPortFolio;
            return Number((currentPrice - avgPrice) / avgPrice * 100)
        }
    }, [
        currentPrice,
        currentPortFolio,
    ]);
    if(isLogin) {
        if(
            profit && 
            profitage &&
            currentPortFolio
        ) {
            const { avgPrice, amount } = currentPortFolio;
            return (
                <div
                    className={styles.container}
                >
                    <table
                        className={styles.portfolio}
                    >
                        <tbody>
                            <tr>
                                <th>화폐명</th>
                                <td className={cx('symbol')}>{symbol}</td>
                            </tr>
                            <tr>
                                <th>평균매입가</th>
                                <td>${avgPrice}</td>
                            </tr>
                            <tr>
                                <th>매입 수량</th>
                                <td>{amount}</td>
                            </tr>
                            <tr>
                                <th>현재 가격</th>
                                <td>${currentPrice}</td>
                            </tr>
                            <tr>
                                <th>손익</th>
                                <td
                                    className={cx('profit', {
                                        up: profit > 0,
                                        down: profit <0
                                    })}
                                >${profit.toFixed(4)}</td>
                            </tr>
                            <tr>
                                <th>손익율</th>
                                <td
                                    className={cx('profitage', {
                                        up: profit > 0,
                                        down: profit <0
                                    })}
                                >{profitage.toFixed(4)}%</td>
                            </tr>
                        </tbody> 
                    </table>
                </div>
            )
        } else {
            return <div
                className={styles.logout}
            >
                <p>{symbol}에 아직 포트폴리오가 없습니다!</p>
            </div>
        }
    } else {
        return <div
            className={styles.logout}
        >
            <p>로그인을 하십시요.</p>
        </div>
    }
}

export default PortFolio;
