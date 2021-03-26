// entities
import { 
    RawCoinInfo, 
    CoinInfo,
    ExchangeData,
    HistoData,
    HistoDataTimeType,
    RawHistoData,
    PairData,
    ToPairData
} from '../entities/cryptoData';
import {
    AuthError,
    AuthSuccess
} from '../entities/api/auth';
import { coinInfoParse } from '../entities/utils';
import { Portfolio } from '../entities/api/portfolio';

const getUrlWithKey = (url: string) => url + `&api_key=${process.env.REACT_APP_CRYPTO_API_KEY}`;
export interface RawCoinsResponse {
    Data: RawCoinInfo[];
}
export const getTop100Coins = async (): Promise<CoinInfo[]> => {
    const url = `https://min-api.cryptocompare.com/data/top/totalvolfull?limit=100&tsym=USD`;
    const urlWithKey = url + `&api_key=${process.env.REACT_APP_CRYPTO_API_KEY}`;
    try {
        const result = await fetch(urlWithKey);
        const parsed = await result.json() as RawCoinsResponse;
        return parsed.Data.map( rawInfos => coinInfoParse(rawInfos));
    } catch(e) {
        throw new Error('error occurs during getting top 100 coins');
    }
}

export interface RawResponseHistoData {
    Response: "Success" | 'Error';
    HasWarning: boolean;
    Message: string;
    Type: number;
    RateLimit: {};
    Data: {
        Aggregated:boolean;
        TimeFrom:number;
        TimeTo:number;
        Data: RawHistoData[];
    }
}
export const getHistoDatas = async (symbols: string[]) => {
    const getUrl = (fsym: string) => `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${fsym}&tsym=USD&limit=6`;
    try {
        const results = await symbols.reduce(async (acc,symbol, index) => {
            const currents = await acc.then();
            const url = getUrl(symbol);
            const urlWithKey = getUrlWithKey(url);
            const result = await fetch(urlWithKey);
            const parsed = await result.json() as RawResponseHistoData;
            const mapped = parsed.Data.Data.map( data => ({
                ...data,
                time: new Date(data.time * 1000)
            }));
            currents[index] = mapped;
            return Promise.resolve(currents);
        }, Promise.resolve([] as HistoData[][]));
        return results;
        } catch(e) {
        throw new Error('암호화폐 개별 데이터 요청중 에러가 발생했습니다')
    }
}
/// get single histo data
export interface GetHistoDataProps {
    symbol: string;
    tots: number;
    limit: number;
    timeType: HistoDataTimeType;
}
export const getHistoData = async({ 
    symbol, 
    tots, 
    limit,
    timeType
}:GetHistoDataProps) => {
    let dataType: string;
    if(timeType === 'daily') {
        dataType = 'histoday'
    } else if(timeType === 'hourly') {
        dataType = 'histohour'
    } else {
        dataType = 'histominute'
    }
    
    let url = `https://min-api.cryptocompare.com/data/v2/${dataType}?fsym=${symbol}&tsym=USD&limit=${limit}&aggregate=1`;
    if(timeType === 'daily' || timeType === 'hourly') {
        url += `&toTs=${tots}`
    }

    try {
        const result = await fetch(getUrlWithKey(url));
        const parsed = await result.json() as RawResponseHistoData;
        const mapped = parsed.Data.Data.map( data => ({
            ...data,
            time: new Date(data.time * 1000)
        }));
        return mapped;
    } catch(e) {
        throw new Error(e);
    } 
}

export const getSocketChannel = (path: string): Promise<WebSocket> => {
    return new Promise((resolve, reject) => {
        const socket = new WebSocket(path);

        socket.onopen = () => resolve(socket);
        socket.onerror = (e) => reject(e);
    })
}



interface RawTopExchange {
    Response: 'Success' | 'Error';
    Data: ExchangeData[];
}
interface RawTopPairFrom {
    Response: 'Success' | 'Error';
    Data: PairData[];
}
interface RawTopPairTo {
    Response: 'Success' | 'Error';
    Data: ToPairData[];
}

export const subChartsDatas = async (symbol: string) => {
    const topExchangeUrl =`https://min-api.cryptocompare.com/data/top/exchanges?fsym=${symbol}&tsym=USD&limit=5`;
    const topPairFromByVolume = `https://min-api.cryptocompare.com/data/top/volumes?tsym=${symbol}&limit=5`;
    const topPairToByVolume = `https://min-api.cryptocompare.com/data/top/pairs?fsym=${symbol}&limit=5`;
    try {
        const result1 = await fetch(topExchangeUrl);
        const parsed1 = await result1.json() as RawTopExchange;
        const result2 = await fetch(topPairFromByVolume);
        const parsed2 = await result2.json() as RawTopPairFrom;
        const result3 = await fetch(topPairToByVolume);
        const parsed3 = await result3.json() as RawTopPairTo;
        return {
            topExchanges: parsed1.Response === 'Success' ? parsed1.Data.length === 0 ?  null : parsed1.Data : null,
            topPairFrom: parsed2.Response === 'Success' ? parsed2.Data : null,
            topPairTo: parsed3.Response === 'Success' ? parsed3.Data : null,
        }

    } catch(e) {

    }
}


export const signUp = async (email: string, password: string) => {
    const url = `${process.env.REACT_APP_AWS_API}signup`;
    try {
        const result =  await fetch(url,{
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify( {
                id: email,
                password
            })
        });
        const parsed =await result.json();
        console.log(parsed);
        if(!parsed) {
            throw new Error('회원가입 중에 에러가 발생하였습니다');
        } else {
            return parsed;
        }
    } catch(e) {
        throw new Error('회원가입 중에 에러가 발생하였습니다');
    }
}
export const signIn = async( email: string, password: string) => {
    const url = `${process.env.REACT_APP_AWS_API}login`;
    try {
        const authInfo = email + ':' + password;
        const encodedAuthInfo = btoa(unescape(encodeURIComponent(authInfo)));
        const result =  await fetch(url,{
            method: 'POST',
            mode: 'cors',
            headers: {
                'Authorization' :encodedAuthInfo
            },
        });
        const parsed = await result.json() as AuthError | AuthSuccess;
        if(!parsed) {
            throw new Error('로그인 중에 에러가 발생하였습니다');
        } else if((parsed as AuthError).eCode){ 
            if((parsed as AuthError).eCode === 103 ){
                throw new Error('비밀번호 혹은 이메일을 다시 확인해보세요!');
            }
        } else {
            return parsed;
        }
    } catch(e) {
        throw new Error(e.message);
    }
}
const fetchWithAuthorization = async (url: string ,method: string = "GET", body?: {}) => {
    const authHeader = new Headers();
    const token = window.localStorage.getItem('coinvisu');
    authHeader.append("Authorization", `Bearer ${token}`);
    authHeader.append("Content-Type","application/json");
    if(body) {
        return await fetch(url,{
            method,
            body:JSON.stringify(body),
            "headers": authHeader
        });
    } else {
        return await fetch(url,{
            method,
            "headers": authHeader
        });
    }
    
}
export const requestAddPortfolio = async (symbol: string,price: number, amount: number) => {
    const url = `${process.env.REACT_APP_AWS_API}buyPortfolio`;
    try {
        const result = await fetchWithAuthorization(url,'POST', {
            symbol,
            price,
            amount
        });
        const parsed = await result.json();
        if(parsed === 'success') {
            return true;
        } else {
            throw new Error('업로드중 문제가 발생하였습니다!');
        }
    } catch(e) {
        throw new Error(e.message);
    }
}
interface ResponsePortfolios {
    item: Portfolio[];
}
export const requestPortfolios = async (symbol: string) => {
    const url = `${process.env.REACT_APP_AWS_API}queryPortfolios/${symbol}`;
    try {
        const result = await fetchWithAuthorization(url,'GET');
        const parsed = await result.json() as ResponsePortfolios;
        return parsed.item;
    } catch(e) {
        throw new Error(e.message);
    }
}