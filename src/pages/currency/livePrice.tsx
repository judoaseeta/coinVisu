import React from 'react';
import { 
    withRouter,
    RouteComponentProps
} from 'react-router-dom';
//components
import ErrorComponent from '../../components/error';
import PriceIndicator from '../../components/indicators/priceIndicator';
// hook
import useLiveTicker from '../../hooks/page/currency/useLiveTicker';
// STYLES
import styles from './styles/livePrice.module.scss';

type LivePriceProps = RouteComponentProps<{
    symbol: string;
}>
const LivePrice: React.FC<LivePriceProps> = ({
    match: {
        params: {
            symbol
        }
    }
}) => {
    const data = useLiveTicker(symbol);
    return (
        <div
            className={styles.container}
        >
            {
                data.currentData &&
                <PriceIndicator 
                    data={data.currentData}
                />
            }
            {
                !data.currentData &&
                data.error && 
                <ErrorComponent 
                    message={data.error}
                />
            }
        </div>
    )
}
export default withRouter(LivePrice);
