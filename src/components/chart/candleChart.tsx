import React from 'react';
import classnames from 'classnames/bind';

// components
import XAxis from './axis/xAxis';
import YAxis from './axis/yAxis';
import VolumeChart from './volumeChart';
import InfoSymbols from './infoSymbols';
// style
import styles from './styles/candleChart.module.scss';

// types
import { ChartProps } from './types';
// utils
import {
    getCandleYposEnd,
    getCandleYposStart
} from './utils';

const cx = classnames.bind(styles);
const CandleChart: React.FC<ChartProps> = ({
    xScale,
    yScale,
    volumeScale,
    dimensions,
    children,
    datas,
    selectedIndex,
    timeType,
    symbol,
    onMouseMove,
    onMouseLeave,
}) => <svg
    className={cx('container')}
    viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
    width={dimensions.width}
    height={dimensions.height}
>
    <g
        transform={`translate(${dimensions.marginLeft},${dimensions.marginTop})`}
    >
        {
             // rendering candle bars
            datas.map( (data,i) => {
                const xPos = xScale.bandwidth() / 2;
                return (
                    <line 
                        className={cx('bar')}
                        key={`candle_bar${i}_${data.time}`}
                        x1={xScale(data.time)! + xPos}
                        x2={xScale(data.time)! + xPos}
                        y1={yScale(data.low)}
                        y2={yScale(data.high)}
                        stroke="black"
                    />
                )
            })
        }
        {
            // rendering candle boxes
            datas.map( (data,i) => {
                const width = xScale.bandwidth() * 0.7;
                const xPad = xScale.bandwidth() * 0.15;
                const yPosStart = getCandleYposStart(data);
                const yPosEnd = getCandleYposEnd(data);
                const height = yScale(yPosEnd) - yScale(yPosStart);
                return (
                    <rect 
                        key={`candleBOX-${i}-${data.open}`}
                        className={cx('candle',{
                            up: data.close > data.open,
                            down: data.close < data.open
                        })}
                        x={xScale(data.time)! + xPad}
                        width={width}
                        y={yScale(yPosStart)}
                        height={height}
                    />
                );
            })
        }
    </g>
    <g
        transform={`translate(${dimensions.marginLeft},${dimensions.marginTop})`}
    >
        {
            datas.map( (data,i) =>
                    <rect 
                        className={cx('panel',{
                            selected: i === selectedIndex
                        })}
                        x={xScale(data.time)}
                        width={xScale.bandwidth()}
                        y={0}
                        height={dimensions.height - dimensions.marginTop}
                        key={`panel${i}` + data.low}
                    />
            )
        }
    </g>
    <XAxis 
        x={dimensions.marginLeft}
        bandScale={xScale}
        timeType={timeType}
        y={dimensions.height - dimensions.marginBottom + 5}
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
</svg>;

export default CandleChart;
