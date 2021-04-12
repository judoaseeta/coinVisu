import React, {
    useCallback,
    useState,
    useRef,
} from 'react';
import {
    withRouter,
    RouteComponentProps
} from 'react-router-dom';
import { 
    useSelector 
} from 'react-redux';
// components
import { 
    CandleChart, 
    LineChart,
} from '../../components/chart';
import ErrorComponent from '../../components/error';
import Loading from '../../components/loading';

// state
import { 
    rootState, 
    HistoDataState 
} from '../../state/reducers';
//hook
import useScales from '../../hooks/useScales';
// styles
import styles from './styles/currencyChart.module.scss';

type CurrencyMainChartProps = {
} & RouteComponentProps<{ symbol: string }>
const CurrencyMainChart: React.FC<CurrencyMainChartProps> = ({
    match: {
        params: {
            symbol
        }
    }
}) => {
    const divRef = useRef<HTMLDivElement | null>(null);
    const {
        datas,
        lastTimeType,
        isLoading,
        loadingMessage,
        error
    } = useSelector<rootState,HistoDataState>( state => state.histoData);
    const [ chartType, setChartType ] = useState<'candle'|'line'>('candle');
    const [ selectedDataIndex, setSelectedDataIndex ] = useState(-1);
    const { 
        ref, 
        dimensions,
        xScale,
        yScale,
        volumeScale
    } = useScales({
        datas,
        initialDimensions: {
            width: 300,
            height: 200,
            marginBottom: 0.3,
            marginTop: 0.05,
            marginLeft: 0.1,
            marginRight: 0.05
        },
        isVolumeNeeded: true
    });
    const onMouseMove:React.MouseEventHandler<SVGRectElement> = useCallback((e) => {  
        const container = divRef.current;
        if(xScale &&container ) {
            const {left} = container.getBoundingClientRect();
            const bandWidth = xScale.bandwidth();
            const purePosX = Math.floor(e.clientX - left - dimensions.marginLeft);
            const index = Math.floor(purePosX / bandWidth);
            if(index < xScale.domain().length) {
                setSelectedDataIndex(index);
            }
        }
    },[
    xScale,
    divRef,
    dimensions,

    ]);

    const onMouseLeave: React.MouseEventHandler<SVGRectElement> = useCallback((e) => {
        setSelectedDataIndex(-1);
    },[

    ]);
    return (
        <div
            className={styles.container}
            ref={divRef}
        >
            <button
                className={styles.swapButton}
                onClick={() => {
                    if(chartType === 'candle') setChartType('line');
                    else setChartType('candle');
                }}
            >
                { chartType === 'candle' ? '선형 차트로 전환' : '캔들 차트로 전환'}
            </button>
            <div
                ref={ref}
                className={styles.wrapper}
                >
                    {
                        error &&
                        <ErrorComponent 
                            message={error}
                        />
                    }
                    {
                        isLoading &&
                        loadingMessage &&
                        <Loading 
                            loadingMessage={loadingMessage}
                        />
                    }
                    {
                        chartType === 'candle' && 
                        dimensions &&
                        xScale &&
                        yScale &&
                        volumeScale &&
                        datas &&
                        !isLoading &&
                        <CandleChart 
                            dimensions={dimensions}
                            datas={datas}
                            onMouseMove={onMouseMove}
                            onMouseLeave={onMouseLeave}
                            selectedIndex={selectedDataIndex}
                            xScale={xScale}
                            yScale={yScale}
                            volumeScale={volumeScale}
                            symbol={symbol}
                            timeType={lastTimeType}
                        />
                    }
                    {
                        chartType ==='line' && 
                        xScale &&
                        yScale &&
                        volumeScale &&
                        datas &&
                        !isLoading &&
                        <LineChart 
                            dimensions={dimensions}
                            datas={datas}
                            onMouseMove={onMouseMove}
                            onMouseLeave={onMouseLeave}
                            selectedIndex={selectedDataIndex}
                            xScale={xScale}
                            yScale={yScale}
                            volumeScale={volumeScale}
                            timeType={lastTimeType}
                            symbol={symbol}
                        />
                    }
            </div>
        </div>
    )
}
export default withRouter(CurrencyMainChart);
