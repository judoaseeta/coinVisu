import React from 'react';

//styles
import classnames from 'classnames/bind';
import styles from './styles/loading.module.scss';
const cx = classnames.bind(styles);

export interface LoadingProps {
    loadingMessage: string;
    colorOption?: 'light' |'dark';
}
const Loading:React.FC<LoadingProps> = ({
    loadingMessage,
    colorOption
}) => 
<div
    className={cx('container')}
>
    <div
        className={cx('inner')}
    >
        <img 
            className={cx('loadingImage')}
            alt="Loading"
            src="/profile.png"
        />
        <h3
            className={cx('loadingText', {
                light: colorOption === 'light',
                dark: colorOption === 'dark'
            })}
        >{loadingMessage}</h3>
    </div>
</div>;

export default Loading;