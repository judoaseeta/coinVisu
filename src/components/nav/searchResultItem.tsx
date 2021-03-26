import React from 'react';
import { Link } from 'react-router-dom';

import { CoinData } from '../../entities/cryptoData';
// utils
import {
    highlightMatchedText
} from './utils';
// styles
import classnames from 'classnames/bind';
import styles from './styles/searchResultItem.module.scss';
const cx = classnames.bind(styles);

export interface SearchResultItemProps {
    data: CoinData;
    searchKeyword: string;
}


const SearchResultItem = React.forwardRef<HTMLAnchorElement, SearchResultItemProps>(({ data, searchKeyword  }, ref) => {
    return <li
    >
        <Link
            className={cx('searchResultItem')}
            to={`/currency/${data.symbol}`}
            ref={ref}
        >
            <div
                className={cx('holder')}
            >
                <span className={cx('tag')}>코인심볼: </span>
                <h4
                    className={cx('symbol')}
                >{highlightMatchedText(data.symbol, searchKeyword,cx('highlighted'))}</h4>
            </div>
            <div
                className={cx('holder')}
            >
                <span className={cx('tag')}>코인명: </span>
                <p
                    className={cx('fullName')}
                >{highlightMatchedText(data.coinName, searchKeyword,cx('highlighted'))}</p>
            </div>
        </Link>
    </li>
}) ;

export default SearchResultItem;

