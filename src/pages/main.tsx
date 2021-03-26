import React from 'react';
// styles
import styles from './styles/main.module.scss';
// hooks 
import useMain from '../hooks/page/useMain';

// components
import CoinInfos from '../components/coinInfos';

import PageSelector from '../components/pageSelector';
import Loading from '../components/loading';
import ErrorComponent from '../components/error';

const Main: React.FC = () => {
    const { 
        infos, 
        error,
        page,
        onPage,
        histoDatasForPage,
        loadingMessage,
        isLoading,
    } = useMain();
    return (
        <section
            className={styles.container}
        >
            {
                isLoading && 
                <Loading 
                    loadingMessage={loadingMessage}
                />
            }
            {
                !isLoading && 
                histoDatasForPage &&
                infos && 
                <h3>현재 시장에서 가장 핫한 코인 100선.</h3>
            }
            {
                !isLoading && 
                histoDatasForPage &&
                infos && 
                <CoinInfos 
                    infos={infos}
                    histoDatas={histoDatasForPage}  
                    previewSrc="/noload.png"
                />
            }
            {
                !isLoading && 
                histoDatasForPage &&
                <PageSelector 
                    currentPage={page}
                    onPage={onPage}
                />
            }
            {
                error &&
                <ErrorComponent 
                    message={error}
                    onErrorClose={() => console.log('errorclose')}
                />
            }
        </section>
    );
}

export default Main;
