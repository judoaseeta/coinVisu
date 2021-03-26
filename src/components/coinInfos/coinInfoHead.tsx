import React from 'react';
import styles from './styles/coinInfoHead.module.scss';

const headList = ['화폐명', '거래가', '일일 거래량','시가 총액', '일주일 변동차트', '24시간 변동율'];
const CoinInfoHead: React.FC = () => 
<thead
    className={styles.head}
>
    <tr
        className={styles.headRow}
    >
        {
            headList.map( head => 
                <th
                    className={styles.headItem}
                    key={head}
                >{head}</th>
            )
        }
    </tr>
</thead>;

export default CoinInfoHead;
