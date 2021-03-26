import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles/seeMore.module.scss';

interface SeeMoreProps {
    totalResultsLength: number;
    keyword: string;
}
const SeeMore =  React.forwardRef<HTMLAnchorElement, SeeMoreProps>(({  
    totalResultsLength,
    keyword
}, ref) =>{
    return <li>
        <Link
            className={styles.seeMore}
            to="/search"
            ref={ref}
        >
            <span className={styles.keyword}>
                {keyword}
            </span>로 검색된 {totalResultsLength - 10}개의 암호화폐가 더 있습니다!
        </Link>
    </li>
});

export default SeeMore;
