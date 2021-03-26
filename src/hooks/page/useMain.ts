import { 
    useDispatch,
    useSelector
} from 'react-redux';
import { 
    useCallback,
    useEffect,
    useMemo
} from 'react';

//actions
import {
    requestCoinInfos,
    requestPartialHistoDatas,
    setCoinInfosPage
} from '../../state/actions';
// state
import {
    rootState, 
    CoinInfosState
} from '../../state/reducers';
// entity
import { 
    CoinInfo, 
    HistoData 
} from '../../entities/cryptoData';

interface ReturnUseMainCoinInfos {
    infos: CoinInfo[]| undefined;
    histoDatasForPage: HistoData[][] | undefined;
    error: string;
    page: number;
    isLoading: boolean;
    loadingMessage: string;
    onPage: (page: number) => void;
}
const useMainCoinInfos = (limit: number = 100):ReturnUseMainCoinInfos => {
    // dispatch
    const dispatch = useDispatch();
    // state
    const {
        page,
        coinInfos,
        histoDatas,
        error,
        isLoading,
        loadingMessage
    } = useSelector<rootState, CoinInfosState>( state => state.coinInfos);
    const infosForPage = useMemo(() => {
        const endIndex = page * 10;
        const startIndex = endIndex - 10;
        if(coinInfos) {
            return coinInfos.slice(startIndex,endIndex);
        }
    },[
        coinInfos,
        page
    ]);

    const histoDatasForPage = useMemo(() => {
        const endIndex = page * 10;
        const startIndex = endIndex - 10;
        if(coinInfos && histoDatas && histoDatas[startIndex]) {
            return histoDatas.slice(startIndex,endIndex);
        }
    },[
        coinInfos,
        histoDatas,
        page
    ])
    // for coininfo datas
    useEffect(() => {
        if(!coinInfos) {
            dispatch(requestCoinInfos());
        }
    },[
        coinInfos,
        dispatch
    ]);
    // for histodatas
    useEffect(() => {
        const endIndex = page * 10;
        const startIndex = endIndex - 10;
        if(coinInfos && histoDatas && !histoDatas[startIndex]) { 
            dispatch(requestPartialHistoDatas(page));
        }
    },[
        dispatch,
        coinInfos,
        page,
        histoDatas
    ]);
    // on Page
    const onPage = useCallback((page) => {
        dispatch(setCoinInfosPage(page));
    },[
        dispatch
    ]);
    return {
        error,
        histoDatasForPage,
        loadingMessage,
        isLoading,
        infos: infosForPage,
        page,
        onPage
    }
}

export default useMainCoinInfos;
