import React from 'react';
// components
import SeeMore from './seeMore';
import SearchResultItem from './searchResultItem';

// entity
import { CoinData } from '../../entities/cryptoData';
// styles
import classnames from 'classnames/bind';
import styles from './styles/search.module.scss';

const cx = classnames.bind(styles);

export interface SearchProps {
    results: CoinData[];
    searchKeyword: string;
    totalResultsLength: number;
    on: boolean;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    onKeyDown: React.KeyboardEventHandler;
    onFocus: React.FocusEventHandler;
}
const Search = React.forwardRef<HTMLFormElement, SearchProps>(({ 
    results, 
    searchKeyword,
    totalResultsLength,
    on,
    onChange,
    onFocus,
    onKeyDown
},ref) => {
    return(
        <form
            className={cx('search')}
            onKeyDown={onKeyDown}
            onSubmit={ e => e.preventDefault()}
            ref={ref}
        >
            <input 
                className={cx('searchInput')}
                value={searchKeyword}
                onChange={onChange}
                onFocus={onFocus}
                placeholder="원하는 가상화폐의 영문심벌이나 이름을 입력하세요"
            />
            <div
                className={cx('hiddenResult', {
                    on: on
                })}
            >
                <ul
                    className={styles.searchResult}
                >
                    {
                        results.slice(0,10).map( (data,index) =>
                            <SearchResultItem 
                                searchKeyword={searchKeyword}
                                data={data}
                                key={data.symbol}
                            />    
                        )
                    }
                     {
                        totalResultsLength > 10 && <SeeMore 
                            keyword={searchKeyword}
                            totalResultsLength={totalResultsLength} 
                        />
                    }   
                </ul>
            </div>
        </form>
    )
});

export default Search;

