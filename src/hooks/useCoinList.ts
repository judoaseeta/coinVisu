import { 
    useDispatch,
    useSelector,
} from 'react-redux';
import { 
    useCallback, 
    useState, 
    ChangeEvent  
} from 'react';

// state
import { searchCoinList } from '../state/actions';
import {
    rootState,
    CoinListState
} from '../state/reducers';

const useCoinList = () => {
    const dispatch = useDispatch();
    const {
        selectedCoinList
    } = useSelector<rootState, CoinListState>( state => state.coinList);

    const [ searchKeyword, setSearchKeyword ] = useState('');
    // debounced ChangeEventHandler;
    const onSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const keyword = e.target.value;
        setSearchKeyword(keyword);
        if(keyword.length > 1) {
            dispatch(searchCoinList(keyword));
        } else {
            dispatch(searchCoinList(''));
        }
    },[
        dispatch
    ]);
    return {
        searchKeyword,
        onSearch,
        selectedCoinList
    }
};
export default useCoinList;
