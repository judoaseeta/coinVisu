import { 
    useEffect,
} from 'react';
import { 
    useDispatch, 
    useSelector 
} from 'react-redux';
// actions
import { 
    requestLivePrice, 
    unsubscribeLivePrice  
} from '../../../state/actions';
// states
import { 
    rootState, 
    LivePriceState 
} from '../../../state/reducers';
const UseLiveTicker = (symbol: string) => {
    const dispatch = useDispatch();
    const livePriceState = useSelector<rootState,LivePriceState>((state ) => state.livePrice);
    useEffect(() => {
        dispatch(requestLivePrice(symbol));
        return () => {
            dispatch(unsubscribeLivePrice());
        }
    }, [
        dispatch,
        symbol,
    ]);
    return livePriceState;
}
export default UseLiveTicker;
