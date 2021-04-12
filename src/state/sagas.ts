import { 
    eventChannel,
    EventChannel,
    END
} from 'redux-saga';

import {
    call,
    cancel,
    cancelled,
    fork,
    take,
    takeLatest,
    takeEvery,
    put,
    select
} from 'redux-saga/effects';
// STATE
import { rootState } from './reducers';
// action Types
import { 
    // authentication related
    REQUEST_LOGIN,
    REQUEST_SIGNUP,
    authFailure,
    requestSignUp,
    requestLogin,
    loginSuccess,
    signUpSuccess,
    // coin infos related
    REQUEST_COIN_INFOS,
    REQUEST_PARTIAL_HISTO_DATAS,
    coinInfosSuccess,
    coinInfosFailure,
    requestPartialHistoDatas,
    partialHistoDatas,
    // live price ticker related
    REQUEST_LIVE_PRICE,
    UNSUBSCRIBE_LIVE_PRICE,
    requestLivePrice,
    requestLivePriceSuccess,
    requestLivePriceFailure,
    clearLivePrice,
    // histo data
    REQUEST_HISTO_DATA,
    requestHistoData,
    histoDataSuccess,
    histoDataFailure,
    // portfolio
    addPortfolio,
    addPortfolioFailure,
    addPortfolioSuccess,
    getPortfolios,
    getPortfoliosSuccess,
    ADD_PORTFOLIO,
    GET_PORTFOLIOS,
} from './actions';

// apis
import { 
    getSocketChannel,
    getTop100Coins,
    getHistoData,
    getHistoDatas,
    signUp,
    signIn,
    requestAddPortfolio,
    requestPortfolios
} from '../api';

// entity
import { 
    RawCurrentData,
    CoinInfo,
    HistoData,
} from '../entities/cryptoData';
import { Portfolio } from '../entities/api/portfolio';
import {
    rawToCurrentData
} from '../entities/utils';

function* rootSaga() {
    yield fork(listenLivePrice);
    yield takeLatest(REQUEST_COIN_INFOS,workerInfos);
    yield takeLatest(REQUEST_PARTIAL_HISTO_DATAS,workerPartialHistoDatas);
    yield takeLatest(REQUEST_HISTO_DATA, workerHistoData);
    yield takeLatest(REQUEST_LOGIN,signInSaga);
    yield takeLatest(REQUEST_SIGNUP, signUpSaga);
    yield takeLatest(ADD_PORTFOLIO, addPortfolioSaga);
    yield takeLatest(GET_PORTFOLIOS, getPortfoliosSaga);
}


/// live ticker relate sagas

/**
 *  watcher saga for live ticker
 */
function* listenLivePrice() {
    while(true) {
        //@ts-ignore
       const task = yield takeEvery(REQUEST_LIVE_PRICE,fetchLivePrice);
       yield take(UNSUBSCRIBE_LIVE_PRICE);
       yield cancel(task);
   }
}
function createSocketChannel(socket: WebSocket, message: string) {
    socket.send(message);
    return eventChannel(emit => {
        socket.onmessage = (event) => {
            emit(event.data)
        };
    
        socket.onclose = () => {
            emit(END);
        };
    
        const unsubscribe = () => {
            socket.close();
            socket.onmessage = null;
        };
    
        return unsubscribe;
    });
}
/**
 *  worker saga for live ticker
 */
function* fetchLivePrice(action: ReturnType<typeof requestLivePrice>) {
    // should type variables first and assign
    // unless typescript will throw error non implicit any in Generator
    let socket: WebSocket;
    let channel: EventChannel<{
        unsubscribe: () => void;
    }>;
    const address = `wss://streamer.cryptocompare.com/v2?api_key=${process.env.REACT_APP_CRYPTO_API_KEY}`;
    try {
        socket = yield call(getSocketChannel, address);
        const requestLivePrice = JSON.stringify({
            "action": "SubAdd",
            "subs": [`5~CCCAGG~${action.payload.symbol}~USD`]
        })
        channel = yield call(createSocketChannel, socket, requestLivePrice);
        while(true) {
            const payload: string = yield take(channel);
            const parsed = JSON.parse(payload) as RawCurrentData;
            if(parsed.TYPE === "5") {
                const transformed = rawToCurrentData(parsed);
                yield put(requestLivePriceSuccess(transformed, action.payload.symbol));
            } else if(parsed.TYPE ==="500") {
                channel.close();
                throw new Error('죄송합니다 이 가상화폐는 라이브가 지원되지 않습니다');
            }
        }
    } catch(e) {
        yield put(requestLivePriceFailure(e.message));
    } finally {
        // 현재 타입스크립트는 리덕스 사가의 변수에 할당하지 않는 yield 관련해서 타입에러 이슈가 있음.
        // @ts-ignore
        if(yield cancelled()) {
             // @ts-ignore
            if(channel) {
                channel.close();
                yield put(clearLivePrice());
            }
        }
    }
}


/**
 *  worker saga for coinInfos
 */
function* workerInfos() {
    try {
        const result:CoinInfo[]  = yield call(getTop100Coins);
        yield put(coinInfosSuccess(result));
        yield put(requestPartialHistoDatas(1));
    } catch(e) {
        yield put(coinInfosFailure(e.message));
    }
}
/**
 *  state selector function for getting symbols
 *  @params state: rootState, page: number
 */
const getSymbols = (state: rootState, page: number) => {
    const { coinInfos } = state.coinInfos;
    if(coinInfos) {
        const endIndex = page * 10;
        const startIndex = endIndex - 10;
        return coinInfos.slice(startIndex, endIndex);
    }
}
/**
 *  worker saga for partialHistoDatas
 */
function* workerPartialHistoDatas(action: ReturnType<typeof requestPartialHistoDatas>) {
    const slicedInfos: CoinInfo[] = yield select((state:rootState) => getSymbols(state, action.payload.page));
    try {
        if(slicedInfos) {
            const symbols: string[] = yield slicedInfos.map( (data: CoinInfo) => data.NAME);
            const result: HistoData[][] = yield call(getHistoDatas,symbols);
            yield put(partialHistoDatas(action.payload.page, result));
        }
    } catch(e) {
        yield put(coinInfosFailure(e.message));
    }
}


/**
 * worker saga for getting histoData for chart in <Currency />
 */
function* workerHistoData(action: ReturnType<typeof requestHistoData>) {
    try {
        const { symbol, limit, tots, timeType } = action.payload;
        const histoData: HistoData[] = yield call(getHistoData, {
            symbol,
            tots,
            limit,
            timeType
        });
        yield put(histoDataSuccess(histoData,timeType));
    } catch(e) {
        yield put(histoDataFailure(e.message));
    }
}
/**
 * worker saga for signUp
 *
 */
function* signUpSaga({payload: { id, password }}: ReturnType<typeof requestSignUp>) {
    try {
        yield call(signUp, id, password);
        yield put(signUpSuccess());
    } catch(e) {
        yield put(authFailure('회원가입 에러:' +e.message));
    }
}
/**
 * worker saga for login
 *
 */
function* signInSaga({ payload: { id, password}}: ReturnType<typeof requestLogin>) {
    try {
        const result:{ token: string, id: string} = yield call(signIn,id, password);
        window.localStorage.setItem('coinvisu', result.token);
        yield put(loginSuccess(result.token, result.id));
    } catch(e) {
        yield put(authFailure('로그인 에러:' + e.message));
        alert('로그인 에러:' + e.message);
    }
}
/***
 * worker saga for addPortfolio
 */
function* addPortfolioSaga({ type, payload : { amount, price, symbol }}:ReturnType<typeof addPortfolio>) {
    console.log(type);
    try {
        if(!window.localStorage.getItem('coinvisu')) {
            throw new Error('로그인을 다시 해주세요');
        }
        // 현재 타입스크립트는 리덕스 사가의 변수에 할당하지 않는 yield 관련해서 타입에러 이슈가 있음.
        // 불가피하게 할당함.
        const res: true = yield call(requestAddPortfolio, symbol, price, amount);
        yield put(addPortfolioSuccess());
        yield put(getPortfolios(symbol));
    }catch(e) {
        yield put(addPortfolioFailure(e.message));
    } 
}
/**
 * worker saga for getPortfolios
 * 
 */
function* getPortfoliosSaga({ type, payload: { symbol }} : ReturnType<typeof getPortfolios>) {
    try {
        const result:Portfolio[] = yield call(requestPortfolios, symbol);
        yield put(getPortfoliosSuccess(symbol,result));
    } catch(e) {
        console.log(e);
    }
}
export default rootSaga;
