import React from 'react';
import { 
    withRouter,
    RouteComponentProps
} from 'react-router-dom';
// hooks
import UseAddPortfolio from '../../hooks/useAddPortfolio';
// component
import AddPortFolioComponent from '../../components/portfolio/addPortfolio';

type AddPortFolioProps = {} & RouteComponentProps<{ symbol: string }>;
const AddPortFolio:React.FC<AddPortFolioProps> = ({
    match : {
        params : {
            symbol
        }
    }
}) => {
    const data = UseAddPortfolio({
        symbol,
        minAmount: 0.00001,
        maxAmount: 100,
        minPrice: 0.00001,
        maxPrice: 100000
    });
    return <AddPortFolioComponent 
        {...data}
        symbol={symbol}
    />
}

export default withRouter(AddPortFolio);