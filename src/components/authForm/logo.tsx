import React from 'react';
import UseAsyncImage from '../../hooks/useAsyncImage';
// styles
import styles from './styles/authFormLogo.module.scss';

const AuthFormLogo: React.FC = () => {
    const src =UseAsyncImage({
        previewSrc: '/noload.png',
        loadSrc: '/logo.png'
    })
    return <img 
        className={styles.logo}
        src={src}
        alt="Logo for coinvisu"
    />
}
export default AuthFormLogo;
