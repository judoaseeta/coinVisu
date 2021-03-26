import React from 'react';

// styles
import classnames from 'classnames/bind';
import styles from './styles/pageSelector.module.scss';

const cx = classnames.bind(styles);

export interface PagesProps {
    currentPage: number;
    onPage: (page: number) => void;
}
const Pages: React.FC<PagesProps> = ({
    currentPage,
    onPage
}) =>
<div
    className={cx('container')}
>
    <ul
        className={cx('list')}
    >
        {
            Array(10).fill(null).map((_, index) => 
                <li
                    className={cx('page',{
                        selected: index+1 === currentPage
                    })}
                    onClick={ () => onPage(index+1)}
                    key={`page${index}`}
                    tabIndex={0}
                >{index + 1}</li>
            )
        }
    </ul>
</div>;

export default Pages;
