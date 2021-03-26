import React from 'react';
// entity
import { CoinData } from '../../entities/cryptoData';
// components
import SearchResultItem from './searchResultItem';
// styles 
import styles from './styles/extendedSearch.module.scss';

export interface ExtendedSearchProps {
    datas: CoinData[];
    searchKeyword: string;
}
const ExtendedSearch:React.FC<ExtendedSearchProps> = ({
    datas,
    searchKeyword
}) => 
<section
    className={styles.container}
>
    <ul
        className={styles.searchList}
    >
        {datas.map( data => 
            <SearchResultItem 
                data={data}
                searchKeyword={searchKeyword}
                key={data.coinName}
            />
        )}
    </ul>
</section>;

export default ExtendedSearch;
