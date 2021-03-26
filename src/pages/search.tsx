import React from 'react';
import { useSelector } from 'react-redux';
// component
import ExtendedSearch from '../components/nav/extendedSearch';
//state 
import {
    rootState,
    CoinListState
} from '../state/reducers';

const Search:React.FC = () => {
    const { 
        selectedCoinList, 
        searchKeyword
    } = useSelector<rootState, CoinListState>( state => state.coinList);

    return <ExtendedSearch 
        searchKeyword={searchKeyword}
        datas={selectedCoinList}
    />
}

export default Search;
