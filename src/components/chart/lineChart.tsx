import React from 'react';
import { line } from 'd3-shape';


// components
import XAxis from './axis/xAxis';
import YAxis from './axis/yAxis';
import VolumeChart from './volumeChart';
import InfoSymbols from './infoSymbols';
// types
import {
    ChartProps
} from './types';
import {
    HistoData
} from '../../entities/cryptoData';
// styles
import classnames from 'classnames/bind';
import styles from './styles/lineChart.module.scss';
const cx = classnames.bind(styles);
const LineChart:React.FC<ChartProps> = ({
    children,
    datas,
    dimensions,
    selectedIndex,
    volumeScale,
    symbol,
    timeType,
    xScale,
    yScale,
    onMouseMove,
    onMouseLeave
}) => {
    const chartLine = React.useMemo(() => (
        line<HistoData>()
            .x((d) =>{
                return  xScale(d.time)! + xScale.bandwidth() /2
            })
            .y((d) => {
                return yScale(d.close)!
            })
    ),[
        xScale,
        yScale
    ]);
    const lines = React.useMemo(() => (
        chartLine(datas)
    ),[ 
        chartLine,
        datas
    ]);
    return (
        <svg
            className={cx('container')}
            viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
            width={dimensions.width}
            height={dimensions.height}
        >
            <g
                transform={`translate(${dimensions.marginLeft},${dimensions.marginTop})`}
            >
                {
                    lines && <path 
                        className={cx('line')}
                        d={lines}
                        fill="none"
                        stroke="black"
                    />
                }     
            </g>
            <g
                transform={`translate(${dimensions.marginLeft},${dimensions.marginTop})`}
            >
                {
                    datas.map( (data,i) =>
                            <rect 
                                className={cx('panel',{
                                    selected: selectedIndex === i,
                                    up: data.close > data.open,
                                    down: data.close < data.open
                                })}
                                x={xScale(data.time)}
                                width={xScale.bandwidth()}
                                y={0}
                                height={dimensions.height }
                                key={`panel${i}` + data.low}
                            />
                    )
                }
            </g>            
    <XAxis 
        x={dimensions.marginLeft}
        bandScale={xScale}
        y={dimensions.height - dimensions.marginBottom + 5}
        timeType={timeType}
    />
    <YAxis 
        linearScale={yScale}
        x={0}
        y={dimensions.marginTop}
        xPad={dimensions.marginLeft}
    />
    <VolumeChart 
        volumeScale={volumeScale}
        datas={datas}
        dimensions={dimensions}
        xScale={xScale}
    />
    {
        selectedIndex > -1 &&
        <InfoSymbols 
            data={datas[selectedIndex]}
            dimensions={dimensions}
            timeType={timeType}
            xScale={xScale}
            yScale={yScale}
            fsym={symbol}
        />
    }
    <rect 
        className={cx('topPanel')}
        x={dimensions.marginLeft}
        y={0}
        width={dimensions.boundedWidth}
        height={dimensions.height}
        fill="black"
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
    />
    {
        selectedIndex > -1 &&
        <circle 
            className={styles.dateCircle}
            cx={dimensions.marginLeft+ xScale(datas[selectedIndex].time)! + xScale.bandwidth() / 2 }
            cy={dimensions.height - dimensions.marginBottom + 5}
            r={3}
        />
    }
</svg>
    )
};

export default LineChart;
