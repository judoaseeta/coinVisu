import React from 'react';
// state
import { rootState } from '../../state/reducers';
// component
import Main from '../main';
// test related
import { 
    render,
    mockInitialState,
    fireEvent,
    waitFor,
    screen,
} from '../../utils/test/richTest';
import {
    mockCoinInfo
} from '../../utils/test/mockDatas';
import handlers, {
    histoDataFailure
} from '../../utils/test/handlers';
import server from '../../utils/test/mockWorker';

describe('Testing page <Main />',() => {
    it('Without data, it should render loading and request data', async () => {
        const initialStateWithoutCoinInfos: rootState = {
            ...mockInitialState,
            coinInfos: {
                coinInfos: null,
                isLoading: false,
                histoDatas: null,
                loadingMessage: '',
                error: '',
                page: 1
            }
        } 
        const { container } = render(<Main />, {
            initialState: initialStateWithoutCoinInfos
        });
        // render loading message for coin list
        expect(screen.getByText('거래량별 상위 암호화폐 목록을 불러오고 있습니다...')).toBeInTheDocument();
        // render loading message for requesting histo datas
        await waitFor(() => {
            const loadingMessage2 = screen.getByText('각 암호화폐별 가격변동 데이터를 불러오고 있습니다....');
            expect(loadingMessage2).toBeInTheDocument();
        });
        // render info items for current page
        await waitFor(() => {
            const coinInfoItems = container.getElementsByClassName('infoItem');
            expect(coinInfoItems.length).toEqual(10);
        });
        // go to page 7
        const page7 = screen.getByText('7');
        expect(page7).toBeInTheDocument();
        fireEvent.click(page7);
        // render loading message for requesting histo datas of new page
        await waitFor(() => {
            const loadingMessage2 = screen.getByText('각 암호화폐별 가격변동 데이터를 불러오고 있습니다....');
            expect(loadingMessage2).toBeInTheDocument();
        });
        // render new info items for new page
        await waitFor(() => {
            const coinInfoItems = container.getElementsByClassName('infoItem');
            expect(coinInfoItems.length).toEqual(10);
        });
    });
    it('when error, should render error component',async () => {
        server.resetHandlers();
        server.use(histoDataFailure);
        server.restoreHandlers();
        const initialStateWithoutCoinInfos: rootState = {
            ...mockInitialState,
            coinInfos: {
                coinInfos: null,
                isLoading: false,
                histoDatas: null,
                loadingMessage: '',
                error: '',
                page: 1
            }
        } 
        const { container } = render(<Main />, {
            initialState: initialStateWithoutCoinInfos
        });
        // render loading message for coin list
        expect(screen.getByText('거래량별 상위 암호화폐 목록을 불러오고 있습니다...')).toBeInTheDocument();
        await waitFor(() =>{
            const loadingMessage2 = screen.getByText('각 암호화폐별 가격변동 데이터를 불러오고 있습니다....');
            expect(loadingMessage2).toBeInTheDocument();
        });
        // partial histo data should be failed, error message rendered
        await waitFor(() =>{
            const error = container.querySelector('.error');            
            expect(error).toBeInTheDocument();
        });
    });
});