import React from 'react';
import { useHistory } from 'react-router-dom';
//components
import Search, { SearchProps } from './search';
import NavLogo from './navLogo';

// styles
import classnames from 'classnames/bind';
import styles from './styles/nav.module.scss';
const cx = classnames.bind(styles);

export type NavProps = SearchProps & {
    isLogoOff?: boolean;
};
const Nav = React.forwardRef<HTMLFormElement,NavProps>(({
    searchKeyword,
    results,
    totalResultsLength,
    isLogoOff,
    on,
    onChange,
    onFocus,
    onKeyDown
}, ref) => {
    const history = useHistory();
    return (
        <nav
            className={cx('nav')}
        >
            <button
                className={cx('arrowButton',{
                    on: isLogoOff
                })}
                onClick={() => history.push('/')}
            >
                {"<"}
            </button>
            <NavLogo 
                isLogoOff={isLogoOff}
            />
            <Search 
                on={on}
                onChange={onChange}
                onFocus={onFocus}
                onKeyDown={onKeyDown}
                results={results}
                searchKeyword={searchKeyword}
                totalResultsLength={totalResultsLength}
                ref={ref}
            />
        </nav>
    )
});

export default Nav;
