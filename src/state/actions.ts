// entity
import { 
    CurrentData, 
    CoinInfo,
    HistoData,
    HistoDataTimeType
} from '../entities/cryptoData';
import { Portfolio } from '../entities/api/portfolio';
// Live Price Actions
export const REQUEST_LIVE_PRICE = 'REQUEST_LIVE_PRICE' as const;
const REQUEST_LIVE_PRICE_SUCCESS = 'REQUEST_LIVE_PRICE_SUCCESS' as const;
const REQUEST_LIVE_PRICE_FAILURE = 'REQUEST_LIVE_PRICE_FAILURE' as const;
export const UNSUBSCRIBE_LIVE_PRICE = 'UNSUBSCRIBE_LIVE_PRICE' as const;
export const CLEAR_LIVE_PRICE = 'CLEAR_LIVE_PRICE' as const;

export const requestLivePrice = (symbol: string) => ({
    type: REQUEST_LIVE_PRICE,
    payload: {
        symbol
    }
});

export const requestLivePriceSuccess = (data: CurrentData,symbol: string) => ({
    type: REQUEST_LIVE_PRICE_SUCCESS,
    payload:{
        data,
        symbol
    }
});

export const requestLivePriceFailure = (error: string) => ({
    type: REQUEST_LIVE_PRICE_FAILURE,
    payload: {
        error
    }
});
export const unsubscribeLivePrice = () => ({
    type: UNSUBSCRIBE_LIVE_PRICE
});

export const clearLivePrice = () => ({
    type: CLEAR_LIVE_PRICE
});

export type LivePriceActionTypes = ReturnType<typeof requestLivePrice> |
ReturnType<typeof requestLivePriceSuccess>| 
ReturnType<typeof requestLivePriceFailure>|
ReturnType<typeof unsubscribeLivePrice> |
ReturnType<typeof clearLivePrice>;

// Coin Infos actions
export const REQUEST_COIN_INFOS = 'REQUEST_COIN_INFOS' as const;
export const REQUEST_PARTIAL_HISTO_DATAS = 'REQUEST_PARTIAL_HISTO_DATAS' as const;
export const COIN_INFOS_SUCCESS = 'COIN_INFOS_SUCCESS' as const;
export const PARTIAL_HISTO_DATAS_SUCCESS = 'PARTIAL_HISTO_DATAS_SUCCESS' as const;
export const SET_COIN_INFOS_PAGE = 'SET_COIN_INFOS_PAGE' as const;
export const COIN_INFOS_FAILURE = 'COIN_INFOS_FAILURE' as const;

export const requestCoinInfos = () => ({
    type: REQUEST_COIN_INFOS
});
export const requestPartialHistoDatas = (page: number) => ({
    type: REQUEST_PARTIAL_HISTO_DATAS,
    payload: {
        page
    }
});
export const coinInfosSuccess = (coinInfos: CoinInfo[]) => ({
    type: COIN_INFOS_SUCCESS,
    payload: {
        coinInfos
    }
});
export const coinInfosFailure = (error: string ) => ({
    type: COIN_INFOS_FAILURE,
    payload: {
        error
    }
})
export const partialHistoDatas = (page: number, histoDatas: HistoData[][]) => ({
    type: PARTIAL_HISTO_DATAS_SUCCESS,
    payload: {
        page,
        histoDatas
    }
});
export const setCoinInfosPage = (page:number) => ({
    type: SET_COIN_INFOS_PAGE,
    payload: {
        page
    }
});

export type CoinInfosActionTypes = ReturnType<typeof requestCoinInfos> |
ReturnType<typeof requestPartialHistoDatas> | 
ReturnType<typeof coinInfosSuccess> |
ReturnType<typeof partialHistoDatas> | 
ReturnType<typeof coinInfosFailure> |
ReturnType<typeof setCoinInfosPage>;

// CoinList actions
export const SEARCH_COIN_LIST = 'SEARCH_COIN_LIST' as const;
export const searchCoinList = (keyword: string) => ({
    type: SEARCH_COIN_LIST,
    payload: {
        keyword
    }
});
export type CoinListActionTypes = ReturnType<typeof searchCoinList>;

/// HistoData actions
export const REQUEST_HISTO_DATA = 'REQUEST_HISTO_DATA' as const;
export const REQUEST_HISTO_DATA_SUCCESS = 'REQUEST_HISTO_DATA_SUCCESS' as const;
export const REQUEST_HISTO_DATA_FAILURE = 'REQUEST_HISTO_DATA_FAILURE' as const;
export const CLEAR_HISTO_DATA = 'CLEAR_HISTO_DATA' as const;

export const requestHistoData = (symbol: string, tots: number, limit: number, timeType:HistoDataTimeType ) => ({
    type: REQUEST_HISTO_DATA,
    payload: {
        symbol,
        tots,
        limit,
        timeType
    }
});
export const histoDataSuccess = (datas: HistoData[],timeType: HistoDataTimeType) => ({
    type: REQUEST_HISTO_DATA_SUCCESS,
    payload: {
        datas,
        timeType
    }
});
export const histoDataFailure = (error: string) => ({
    type: REQUEST_HISTO_DATA_FAILURE,
    payload: {
        error
    }
});

export const clearHistoData = () => ({
    type: CLEAR_HISTO_DATA
});

export type HistoDataActionType = ReturnType<typeof requestHistoData> |
ReturnType<typeof histoDataSuccess> | ReturnType<typeof histoDataFailure> |
ReturnType<typeof clearHistoData>;

// signUp login actions

export const AUTH_FAILURE = 'AUTH_FAILURE' as const;
export const CLICK_BACK = 'CLICK_BACK' as const;
export const CLICK_SIGNUP = 'CLICK_SIGNUP' as const;
export const CLICK_LOGIN = 'CLICK_LOGIN' as const;
export const CLICK_LOGOUT = 'CLICK_LOGOUT' as const;
export const REQUEST_SIGNUP = 'REQUEST_SIGNUP' as const;
export const REQUEST_LOGIN = 'REQUEST_LOGIN' as const;
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS' as const;
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS' as const;

export const authFailure = (reason: string) => ({
    type: AUTH_FAILURE,
    payload: {
        reason
    }
})
export const clickBack = () => ({
    type: CLICK_BACK
})
export const clickSignup = () => ({
    type: CLICK_SIGNUP
});
export const clickLogin = () => ({
    type: CLICK_LOGIN
});
export const clickLogout = () => ({
    type: CLICK_LOGOUT
});
export const requestSignUp = (id: string, password: string) => ({
    type: REQUEST_SIGNUP,
    payload :{
        id,
        password
    }
});
export const requestLogin = (id: string, password: string) => ({
    type: REQUEST_LOGIN,
    payload :{
        id,
        password
    }
});

export const signUpSuccess = () => ({
    type: SIGNUP_SUCCESS
})
export const loginSuccess = (token: string, userId: string) => ({
    type: LOGIN_SUCCESS,
    payload: {
        token,
        userId
    }
});
export type AuthActionsType = ReturnType<typeof authFailure> |ReturnType<typeof clickBack> |
ReturnType<typeof clickSignup> | ReturnType<typeof clickLogin> | ReturnType<typeof clickLogout> |
ReturnType<typeof requestSignUp> | ReturnType<typeof requestLogin> | ReturnType<typeof signUpSuccess> |ReturnType<typeof loginSuccess>;

// portfolio related actions;

export const GET_PORTFOLIOS = 'GET_PORTFOLIOS' as const;
const GET_PORTFOLIOS_SUCCESS = 'GET_PORTFOLIOS_SUCCESS' as const;
export const TOGGLE_ADD_PORTFOLIO = 'TOGGLE_ADD_PORTFOLIO' as const;
export const ADD_PORTFOLIO = 'ADD_PORTFOLIO' as const;
export const ADD_PORTFOLIO_FAILURE = 'ADD_PORTFOLIO_FAILURE' as const;
export const ADD_PORTFOLIO_SUCCESS = 'ADD_PORTFOLIO_SUCCESS' as const;
export const getPortfolios = (symbol: string) => ({
    type: GET_PORTFOLIOS,
    payload: {
        symbol
    }
});
export const getPortfoliosSuccess = (symbol:string, portfolios: Portfolio[]) => ({
    type: GET_PORTFOLIOS_SUCCESS,
    payload: {
        portfolios,
        symbol
    }
});
export const addPortfolio = (symbol: string, amount: number, price: number) => ({
    type: ADD_PORTFOLIO,
    payload: {
        symbol,
        amount,
        price
    }
});

export const addPortfolioFailure = (reason: string) => ({
    type: ADD_PORTFOLIO_FAILURE,
    payload: {
        reason
    }
});
export const addPortfolioSuccess = () => ({
    type: ADD_PORTFOLIO_SUCCESS
})
export const toggleAddPortfolio = (toggle: boolean) => ({
    type: TOGGLE_ADD_PORTFOLIO,
    payload: {
        toggle
    }
})
export type PortfolioActions = 
ReturnType<typeof getPortfolios> | ReturnType<typeof addPortfolio> | 
ReturnType<typeof getPortfoliosSuccess> | ReturnType<typeof addPortfolioFailure> |
ReturnType<typeof toggleAddPortfolio> | ReturnType<typeof addPortfolioSuccess>;
