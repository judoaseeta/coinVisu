import { 
    useEffect,
    useMemo
} from 'react';
import {
    useDispatch,
    useSelector,
} from 'react-redux';

// state
import {
    PortfolioState,
    rootState
} from '../state/reducers';
// action
import {
    getPortfolios
} from '../state/actions';
// entity
import {
    CurrentData, 
    HistoData
} from '../entities/cryptoData'

const UsePortfolios = (symbol: string) => {
    const dispatch = useDispatch();
    const portfolios = useSelector<rootState, PortfolioState>(state => state.portfolios);
    const isLogin = useSelector<rootState, boolean>(state => state.auth.isLogin);
    const currentData = useSelector<rootState,CurrentData | null>(state => state.livePrice.currentData);
    const histoData = useSelector<rootState,HistoData[] | null>(state => state.histoData.datas);
    const aggPortfolio = useMemo(() => {
        if(portfolios.list[symbol]) {
            return portfolios.list[symbol].aggregate
        } else {
            return null;
        }
    },[
        symbol,
        portfolios
    ]);
    const currentPrice = useMemo(() => {
        if(currentData && histoData) {
            if(currentData.price) {
                return currentData.price;
            } else {
                return  histoData[histoData.length - 1].close;
            }
        } else if(histoData) {
            return histoData[histoData.length - 1].close;
        } else {
            return 0;
        }
    },[
        currentData,
        histoData
    ]);
    useEffect(() => {
        if(isLogin) {
            dispatch(getPortfolios(symbol));
        }
    },[ 
        dispatch,
        symbol,
        isLogin
    ]);
    return {
        aggPortfolio,
        currentPrice,
        isLogin
    }
}

export default UsePortfolios;
