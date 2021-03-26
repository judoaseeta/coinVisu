import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

// COMPONENTS
import CurrencyController from './currencyController';
import CurrencyMainChart from './currencyMainChart';
import LivePrice from './livePrice';
import SubCharts from './subCharts';
import PortFolios from './portfoliosPage';

// styles
import styles from './styles/currency.module.scss';

type CurrencyProps = RouteComponentProps<{ symbol: string }>;
const Currency: React.FC<CurrencyProps> = ({
    match : {
        params : {
            symbol
        }
    }
}) => 
<section
    className={styles.container}
>
    <CurrencyController />
    <LivePrice />
    <div
        className={styles.charts}
    >
        <CurrencyMainChart />
        <PortFolios />
    </div>
    <SubCharts />
</section>
export default withRouter(Currency);
