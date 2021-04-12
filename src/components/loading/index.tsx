import React from 'react';

//styles
import classnames from 'classnames/bind';
import styles from './styles/loading.module.scss';
const cx = classnames.bind(styles);

export interface LoadingProps {
    loadingMessage: string;
    isAbsolute?: boolean;
    colorOption?: 'light' |'dark';
}
const Loading:React.FC<LoadingProps> = ({
    isAbsolute,
    loadingMessage,
    colorOption
}) => {
    if(loadingMessage) {
        return (
            <div
                className={cx('container',{
                    absolute: isAbsolute
                })}
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
            </div>
        )
    } else {
        return null
    }
};

export default Loading;