import React from 'react';
import { 
    withRouter,
    RouteComponentProps
} from 'react-router-dom';

// components
import PortFolio from '../../components/portfolio/portfolio';
// hook
import UsePortFolios from '../../hooks/usePortfolios';

export type PortFoliosProps = {

} & RouteComponentProps<{ symbol: string }>
const PortFolios:React.FC<PortFoliosProps> = ({
    match: {
        params: {
            symbol
        }
    }
}) => {
    const data = UsePortFolios(symbol);
    return <PortFolio
        symbol={symbol}
        currentPortFolio={data.aggPortfolio}
        currentPrice={data.currentPrice}
        isLogin={data.isLogin}
    />
}
export default withRouter(PortFolios);

