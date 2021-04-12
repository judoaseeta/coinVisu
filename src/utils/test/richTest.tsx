import React from 'react';
import { 
    render as originalRender, 
    RenderOptions 
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { 
    Store 
} from 'redux';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
/// state
import {
    rootState,
} from '../../state/reducers';
import createS from '../../state/store';
import CoinList from '../../assets/coinList';
// mock assets
import { mockCoinInfo, mockChartData } from '../../components/coinInfos/mocks/';
import { mockHistoData50 } from '../../components/chart/mocks';
import { mockDownCurrent } from '../../components/indicators/mocks'
const mockInitialState:rootState = {
    auth: {
        isLogin: false,
        authType: false,
        error: '',
        userId: '',
        loadingMessage: '',
    },
    coinInfos: {
        coinInfos: mockCoinInfo,
        histoDatas: mockChartData.map( d => d.map( item => ({
            ...item,
            time: new Date(item.time * 1000)
        }))),
        error: '',
        page: 1,
        isLoading: false,
        loadingMessage: ''
    },
    coinList: {
        coinList: CoinList,
        searchKeyword: '',
        selectedCoinList: []
    },
    histoData: {
        datas: mockHistoData50,
        isLoading: false,
        loadingMessage: '',
        error: '',
        lastTimeType: 'hourly',
    },
    livePrice: {
        isListening: false,
        currentData: mockDownCurrent,
        currentSymbol: 'BTC',
        error: ''
    },
    portfolios: {
        list: {

        },
        loadingMessage: '',
        addPortfolioLoading: '',
        on: false
    }
}




// custom render
interface CustomRenderOptions<S> extends RenderOptions {
    initialState?: S;
    store?: Store;
    route? : string;
}   

function render<S>(
    ui: React.ReactElement,
    {
        initialState,
        store = createS(initialState),
        route = '/',
        ...renderOptions
    }:CustomRenderOptions<S> = {}
) {
    window.history.pushState(null,'Testing',route);
    const Wrapper: React.FC = ({ children }) => 
        <Provider store={store}>
            <BrowserRouter>
                {children}
            </BrowserRouter>
        </Provider>;
    return originalRender(ui, { wrapper: Wrapper, ...renderOptions });
}
export * from '@testing-library/react';
export {
    render,
    mockInitialState,
    userEvent
}