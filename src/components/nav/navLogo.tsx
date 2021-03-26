import React from 'react';
import useAsyncImage from '../../hooks/useAsyncImage';

// styles
import classnames from 'classnames/bind';
import styles from './styles/navLogo.module.scss';
const cx = classnames.bind(styles);

const NavLogo:React.FC<{
    isLogoOff?:boolean;
}> = ({
    isLogoOff
}) => {
    const src =useAsyncImage({
        previewSrc: '/noload.png',
        loadSrc: '/logo.png'
    })
    return <img 
        className={cx('logo',{
            off: isLogoOff
        })}
        src={src}
        alt="Logo for coinVisu"
    />
}

export default NavLogo;
