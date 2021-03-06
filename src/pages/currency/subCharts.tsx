import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { 
    schemeCategory10,
    schemeTableau10,
    schemeAccent
 } from 'd3-scale-chromatic';
// components
import SubChart from '../../components/pieChart';
import Loading from '../../components/loading';
import ErrorComponent from '../../components/error';
//hook
import UseSubCharts from '../../hooks/page/currency/useSubCharts';
import styles from './styles/subCharts.module.scss';

type SubChartProps = RouteComponentProps<{
    symbol: string;
}>;

const SubCharts: React.FC<SubChartProps> = ({
    match: {
        params: {
            symbol
        }
    }
}) => {
    const {
        ref,
        dimensions,
        data1,
        data2,
        data3,
        loadingMessage,
        error,
    } = UseSubCharts({
        symbol, 
        initialDimensions : {
            width: 100,
            height: 50,
            marginBottom: 0.1,
            marginTop: 0.1,
            marginLeft: 0.1,
            marginRight: 0.1
        }
    })
    return(
        <section
            className={styles.container}
        >
            {
                loadingMessage &&
                <div 
                    className={styles.loadingPanel}
                >
                    <Loading 
                        loadingMessage={loadingMessage}
                        colorOption="light"
                    />
                </div>
            }
            {
                error &&
                <ErrorComponent 
                    message={error}
                />
            }
            {
                !error && 
                <div
                    className={styles.innerContainer}
                >
                    <div
                            className={styles.chartWrapper}
                            ref={ref}
                        >
                            
                            {
                                dimensions.isDomAttached &&
                                data1 &&
                                !loadingMessage &&
                                <SubChart
                                    dimensions={dimensions}
                                    datas={data1}
                                    pieKey={'volume24h'}
                                    coreKey={'exchange'}
                                    colorScheme={schemeCategory10}
                                    startAngle={0}
                                    endAngle={360}
                                    symbol={symbol}
                                    title={"TOP 5 ???????????? ?????????"}
                                />
                            }
                            {
                                !loadingMessage &&
                                !data1 &&
                                <ErrorComponent 
                                    message={"???????????? ???????????? ???????????? ??????"}
                                    size="big"
                                />
                            }
                            
                        </div>
                        <div
                            className={styles.chartWrapper}
                        >
                            {
                                dimensions.isDomAttached &&
                                data2 &&
                                !loadingMessage &&
                                <SubChart
                                    dimensions={dimensions}
                                    datas={data2}
                                    pieKey={'VOLUME24HOURTO'}
                                    coreKey={'SYMBOL'}
                                    colorScheme={schemeAccent}
                                    startAngle={0}
                                    endAngle={360}
                                    symbol={symbol}
                                    title="??? ????????? TOP 5 ??????"
                                />
                            }
                            {
                                !loadingMessage &&
                                !data2 &&
                                <ErrorComponent 
                                    message={"???????????? ???????????? ???????????? ??????"}
                                    size="big"
                                />
                            }
                        </div>
                        <div
                            className={styles.chartWrapper}
                        >
                            {
                                dimensions.isDomAttached &&
                                data3 &&
                                !loadingMessage &&
                                <SubChart
                                    dimensions={dimensions}
                                    datas={data3}
                                    pieKey={'volume24h'}
                                    coreKey={'toSymbol'}
                                    colorScheme={schemeTableau10}
                                    startAngle={0}
                                    endAngle={360}
                                    symbol={symbol}
                                    title="?????? ????????? TOP 5 ??????"
                                />
                            }
                            {
                                !data3 &&
                                !loadingMessage &&
                                <ErrorComponent 
                                    message={"???????????? ???????????? ???????????? ??????"}
                                    size="big"
                                />
                            }
                        </div>
                </div>
            }
        </section>
    )
};

export default withRouter(SubCharts);

