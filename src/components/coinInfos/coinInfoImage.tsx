import React from 'react';
import useAsyncImage, { UseAsyncImageProps } from '../../hooks/useAsyncImage';

import styles from './styles/coinInfoItem.module.scss';
export type CoinInfoImageProps = UseAsyncImageProps
const CoinInfoImage: React.FC<CoinInfoImageProps> = ({
    previewSrc,
    loadSrc
}) => {
    const src = useAsyncImage({
        previewSrc,
        loadSrc
    });
    return <img 
        alt={'coinImage'}
        className={styles.coinImage}
        src={src}
    />
}
export default CoinInfoImage;
