import { 
    Reducer, 
    combineReducers,
} from 'redux';
import { 
    AuthActionsType,
    CoinInfosActionTypes,
    CoinListActionTypes,
    LivePriceActionTypes,
    HistoDataActionType,
    PortfolioActions
} from './actions';
// entity
import { 
    CoinData,
    CoinInfo,
    CurrentData,
    HistoData,
    HistoDataTimeType
} from '../entities/cryptoData';
import {
    AggPortfolio,
    Portfolio
} from '../entities/api/portfolio';
import CoinList from '../assets/coinList';
// state and reducers for LivePrice
export interface LivePriceState {
    currentSymbol: string;
    isListening: boolean;
    currentData : CurrentData |null,
    error: string|null,
}
const livePriceInitialState: LivePriceState = {
    currentSymbol: '',
    isListening: false,
    currentData: null,
    error: null
}
export const LivePriceReducer:Reducer<LivePriceState,LivePriceActionTypes> = (
    state =  livePriceInitialState,
    action: LivePriceActionTypes
) => {
    switch(action.type) {
        case 'REQUEST_LIVE_PRICE_SUCCESS' :
            return {
                ...state,
                error: null,
                isListening: true,
                currentData: {
                    ...action.payload.data,
                    price: !action.payload.data.price && state.currentData ? state.currentData.price : action.payload.data.price
                },
                currentSymbol: action.payload.symbol
            }
        case 'REQUEST_LIVE_PRICE_FAILURE' :
            return {
                ...state,
                isListening: false,
                currentData: null,
                error: action.payload.error
            }
        case 'CLEAR_LIVE_PRICE' :
            return {
                ...state,
                isListening: false,
                currentData: null,
                currentSymbol: ''
            }
        default : return state;
    }
}
// state and reducers for CoinInfos and its histo-datas
export interface CoinInfosState {
    coinInfos: CoinInfo[] | null;
    histoDatas: HistoData[][] | null;
    error: string;
    page: number;
    isLoading: boolean;
    loadingMessage: string;
}
const initialState: CoinInfosState = {
    coinInfos: null,
    histoDatas: null,
    error: '',
    page: 1,
    isLoading: false,
    loadingMessage: '',
}
export const CoinInfosReducer:Reducer<CoinInfosState, CoinInfosActionTypes> = (state = initialState, action) => {
    switch(action.type) {
        case 'REQUEST_COIN_INFOS' :
            return {
                ...state,
                isLoading: true,
                loadingMessage: '거래량별 상위 암호화폐 목록을 불러오고 있습니다...'
            }
        case 'SET_COIN_INFOS_PAGE' :
            return {
                ...state,
                page: action.payload.page
            }
        case 'COIN_INFOS_SUCCESS' : 
            return {
                ...state,
                isLoading: false,
                loadingMessage: '',
                error: '',
                coinInfos: action.payload.coinInfos
            }
        case "COIN_INFOS_FAILURE" :
            return {
                ...state,
                isLoading: false,
                loadingMessage: '',
                error: action.payload.error
            }
        case 'REQUEST_PARTIAL_HISTO_DATAS' :
            return {
                ...state,
                error: '',
                isLoading: true,
                loadingMessage: '각 암호화폐별 가격변동 데이터를 불러오고 있습니다....'
            }
        case 'PARTIAL_HISTO_DATAS_SUCCESS' :
            const endIndex = action.payload.page * 10;
            const startIndex = endIndex - 10;
            // IF NOT initial fetching
            if(state.histoDatas) {
                return {
                    ...state,
                    error: '',
                    isLoading: false,
                    page: action.payload.page,
                    histoDatas: [
                        ...state.histoDatas.slice(0,startIndex),
                        ...action.payload.histoDatas,
                        ...state.histoDatas.slice(endIndex+1)
                    ]
                }
            } else {
                return {
                    ...state,
                    error: '',
                    isLoading: false,
                    page: action.payload.page,
                    histoDatas: [
                        ...action.payload.histoDatas
                    ]
                }
            }
        default: return state;
    }
}
// state and reducer for CoinList
export interface CoinListState {
    coinList: CoinData[];
    selectedCoinList: CoinData[];
    searchKeyword: string;
}
const coinListInitialState: CoinListState = {
    coinList: CoinList,
    selectedCoinList: [],
    searchKeyword: ''
}
// UTIL for CoinList
const isMatched = (keyword: string) => (text: string) => {
    const regex = new RegExp(`${keyword}`,"gi");
    return regex.test(text);
}

export const CoinListReducer: Reducer<CoinListState, CoinListActionTypes> = (state = coinListInitialState, action) => {
    if(action.type === 'SEARCH_COIN_LIST') {
        if(action.payload.keyword === '') {
            return {
                ...state,
                selectedCoinList: [],
                searchKeyword: '',
            }
        }
        const matchWith = isMatched(action.payload.keyword);
        const selectedCoinList = state.coinList.filter( coin => matchWith(coin.coinName) || matchWith(coin.symbol));
        return {
            ...state,
            selectedCoinList,
            searchKeyword: action.payload.keyword
        }
    } else {
        return state;
    }
} 

// histo data state and reducer;
export interface HistoDataState {
    datas: HistoData[] | null;
    isLoading: boolean;
    loadingMessage: string;
    error: string;
    lastTimeType: HistoDataTimeType,
}
const histoDataInitialState: HistoDataState = {
    datas: null,
    isLoading: false,
    loadingMessage: '',
    error: '',
    lastTimeType: 'hourly'
};

export const HistoDataReducer: Reducer<HistoDataState, HistoDataActionType> = (state = histoDataInitialState, action) => {
    switch(action.type) {
        case 'REQUEST_HISTO_DATA' :
            return {
                ...state,
                isLoading: true,
                loadingMessage: `${action.payload.symbol}에 관한 데이터를 불러오고 있습니다!`
            }
        case 'REQUEST_HISTO_DATA_SUCCESS' :
            return  {
                ...state,
                isLoading: false,
                loadingMessage: '',
                datas: action.payload.datas,
                lastTimeType: action.payload.timeType
            }
        case 'REQUEST_HISTO_DATA_FAILURE' :
            return {
                ...state,
                isLoading: false,
                loadingMessage: '',
                datas: null,
                error: action.payload.error
            }
        case 'CLEAR_HISTO_DATA' :
            return {
                ...state,
                isLoading: false,
                loadingMessage: '',
                datas: null,
                error: ''
            }
        default :
            return state;
    }
}

// auth reducer
export interface AuthState {
    authType: 'login' | 'signup' | false;
    userId: string;
    isLogin: boolean;
    error: string;
    loadingMessage: string;
}
const authInitialState: AuthState = {
    authType: false,
    userId: '',
    isLogin: false,
    error: '',
    loadingMessage: '',
}
const authReducer :Reducer<AuthState, AuthActionsType> = (state = authInitialState, action) => {
    switch(action.type) {
        case 'AUTH_FAILURE' :
            return {
                ...state,
                loadingMessage: '',
                error:action.payload.reason,
            }
        case 'CLICK_BACK' :
            return {
                ...state,
                loadingMessage: '',
                authType: false
            }
        case 'CLICK_LOGIN' :
            return {
                ...state,
                authType: 'login'
            };
        case 'CLICK_SIGNUP' :
            return {
                ...state,
                authType: 'signup'
            }
        case 'CLICK_LOGOUT' :
            return {
                ...state,
                authType: false,
                userId: '',
                isLogin: false
            }
        case 'REQUEST_SIGNUP' :
            return {
                ...state,
                error: '',
                loadingMessage: '회원가입 시도중입니다...'
            }
        case 'REQUEST_LOGIN' :
            return {
                ...state,
                error: '',
                loadingMessage: '로그인 시도중입니다...'
            }
        case 'SIGNUP_SUCCESS' :
            return {
                ...state,
                loadingMessage: '',
                authType: 'login',
            }
        case 'LOGIN_SUCCESS' :
            return {
                ...state,
                authType: false,
                isLogin: true,
                userId: action.payload.userId
            }
        default: return state;
    } 
 
}

// portfolio reducer and state
interface CurrPortfolio {
    portfolios: Portfolio[];
    aggregate: AggPortfolio;
}
export interface PortfolioState {
    on: boolean;
    list: Record<string,CurrPortfolio>;
    loadingMessage: string;
    addPortfolioLoading: string;
}
const PortfolioInitialState: PortfolioState = {
    on: false,
    list: {
        
    },
    loadingMessage: '',
    addPortfolioLoading: '',
}
const portfolioReducer: Reducer<PortfolioState, PortfolioActions> = (state = PortfolioInitialState, action) => {
    switch(action.type) {
        case 'ADD_PORTFOLIO' :
            return {
                ...state,
                addPortfolioLoading: '포트폴리오를 추가합니다...'
            }
        case 'ADD_PORTFOLIO_SUCCESS' :
            return {
                ...state,
                addPortfolioLoading: '',
                on: false,
            }
        case 'GET_PORTFOLIOS_SUCCESS' :
            const length = action.payload.portfolios.length;
            const totalAmount = Number(action.payload.portfolios.reduce((acc,curr) => acc + curr.amount, 0).toFixed(4));
            const totalPrice = Number(action.payload.portfolios.reduce((acc,curr) => acc + curr.price, 0).toFixed(4));
            return {
                ...state,
                loadingMessage: '',
                list: {
                    ...state.list,
                    [action.payload.symbol] :  {
                        portfolios: action.payload.portfolios,
                        aggregate :{
                            avgPrice: Number((totalPrice / length).toFixed(4)),
                            amount: totalAmount
                        }
                    }
                }
            }
        case 'GET_PORTFOLIOS' :
            return {
                ...state,
                loadingMessage: `${action.payload.symbol}포트폴리오를 불러오는 중!`
            }
        case 'TOGGLE_ADD_PORTFOLIO' :
            return {
                ...state,
                on: action.payload.toggle
            }
        default :
            return state;
    }
  
}
// root reducer and root state
export const rootReducer = combineReducers({
    livePrice: LivePriceReducer,
    coinInfos: CoinInfosReducer,
    coinList: CoinListReducer,
    histoData: HistoDataReducer,
    auth: authReducer,
    portfolios: portfolioReducer
});
export type rootState = ReturnType<typeof rootReducer>;
