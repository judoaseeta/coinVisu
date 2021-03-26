import { useEffect, useState } from 'react';

export interface UseAsyncImageProps {
    previewSrc?: string;
    loadSrc: string;
}
const useAsyncImage = ({
    previewSrc = '/noload.png',
    loadSrc
}: UseAsyncImageProps) => {
    const [src, setSrc ] = useState(previewSrc);
    useEffect(() => {
        const loader = () => setSrc(loadSrc);
        const img = new Image();
        img.src = loadSrc;
        img.addEventListener('load',loader );
        return () => img.removeEventListener('load',loader);
    }, [
        loadSrc
    ]);
    return src;
}
export default useAsyncImage;
