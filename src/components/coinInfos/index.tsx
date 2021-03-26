import React from 'react';
// components
import CoinInfoHead from './coinInfoHead';
import CoinInfoItem from './coinInfoItem';
// entity
import { CoinInfo, HistoData } from '../../entities/cryptoData';
// styles
import styles from './styles/coinInfos.module.scss';

export interface CoinInfosProps {
    infos: CoinInfo[];
    histoDatas: HistoData[][];
    previewSrc: string;
}
const CoinInfos: React.FC<CoinInfosProps> = ({
    infos,
    histoDatas,
    previewSrc
}) =>
<table
    className={styles.container}
>
    <CoinInfoHead />
    <tbody>
        {
            infos.length > 0 && infos.map((info, index) => 
                <CoinInfoItem 
                    info={info}
                    previewSrc={previewSrc}
                    histoDatas={histoDatas[index]}
                    key={info.NAME + '' +index}
                />    
            )
        }
    </tbody>
</table>;

export default CoinInfos;
