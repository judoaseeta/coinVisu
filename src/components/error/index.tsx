import React from 'react';

// styles
import classnames from 'classnames/bind';
import styles from './styles/error.module.scss';
const cx = classnames.bind(styles);

export interface ErrorComponentProps {
    message: string;
    size? : 'big' | 'middle' | 'small';
    onErrorClose?: React.MouseEventHandler;
}
const ErrorComponent: React.FC<ErrorComponentProps> = ({ 
    message,
    onErrorClose,
    size = 'middle'
}) => 
<section
    className={styles.container}
>
    <p
        className={cx('errorMessage', {
            big: size === 'big',
            middle: size === 'middle',
            small : size === 'small'
        })}
    >
        {message}
    </p>
    {
        onErrorClose &&
        <button
            className={styles.closeButton}
            onClick={onErrorClose}
        >닫기</button>
    }
</section>;

export default ErrorComponent;
