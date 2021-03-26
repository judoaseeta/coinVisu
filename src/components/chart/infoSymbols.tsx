import React from 'react';
import {
    ScaleBand,
    ScaleContinuousNumeric
} from 'd3-scale';
import { ResizedDimensions } from 'use-react-dimensions';
import { 
    HistoData, 
    HistoDataTimeType 
} from '../../entities/cryptoData';
import {
    dataTimeToString
} from './utils';
// styles
import styles from './styles/infoSymbols.module.scss';



interface SymbolsProps {
    data: HistoData;
    dimensions: ResizedDimensions;
    timeType: HistoDataTimeType;
    fsym: string;
    xScale: ScaleBand<Date>;
    yScale: ScaleContinuousNumeric<number,number>;
}
const Symbols: React.FC<SymbolsProps> =({
    data,
    dimensions,
    timeType,
    fsym,
    xScale,
    yScale,
}) => 
<g
    className={styles.symbols}
    transform={`translate(${dimensions.marginLeft},0)`}
>
    <symbol 
        id="timeDetail" 
        viewBox="0 0 80 20"
    >
        <rect
            x={2}
            y={2}
            width={76}
            height={16}
            rx={5}
            ry={5}
            className={styles.wrapper}
        ></rect>
        <text
            className={styles.text}
            x={40}
            y={10}
            alignmentBaseline="central"
        >{dataTimeToString(data.time, timeType)}</text>
    </symbol>
    <symbol
        id="priceDetail"
        viewBox="0 0 100 60"
    >
         <rect
            x={2}
            y={2}
            width={96}
            height={56}
            className={styles.wrapper}
            rx={5}
            ry={5}
        ></rect>
        <text
            className={styles.priceLabel}
            x={5}
            y={12}
            alignmentBaseline="central"
        >
            고가:
        </text>
        <text
            className={styles.priceText}
            x={90}
            y={12}
            alignmentBaseline="central"
        >
            ${data.high}
        </text>
        <text
            className={styles.priceLabel}
            x={5}
            y={23}
            alignmentBaseline="central"
        >
            저가:
        </text>
        <text
            className={styles.priceText}
            x={90}
            y={23}
            alignmentBaseline="central"
        >
            ${data.low}
        </text>
        <text
            className={styles.priceLabel}
            x={5}
            y={34}
            alignmentBaseline="central"
        >
            시가:
        </text>
        <text
            className={styles.priceText}
            x={90}
            y={34}
            alignmentBaseline="central"
        >
            ${data.open}
        </text>
        <text
            className={styles.priceLabel}
            x={5}
            y={45}
            alignmentBaseline="central"
        >
            종가:
        </text>
        <text
            className={styles.priceText}
            x={90}
            y={45}
            alignmentBaseline="central"
        >
            ${data.close}
        </text>
    </symbol>
    <symbol
        id="volumeDetail"
        viewBox="0 0 100 30"
    >
        <rect
            x={2}
            y={2}
            width={96}
            height={26}
            rx={5}
            ry={5}
            className={styles.wrapper}
        ></rect>
        <text
            className={styles.volumeLabel}
            x={5}
            y={10}
            alignmentBaseline="central"
        >{fsym}</text>
        <text
            className={styles.volumeText}
            x={95}
            y={10}
            alignmentBaseline="central"
        >
            {data.volumefrom}
        </text>
        <text
            className={styles.volumeLabel}
            x={5}
            y={21.5}
            alignmentBaseline="central"
        >USD</text>
        <text
            className={styles.volumeText}
            x={95}
            y={21}
            alignmentBaseline="central"
        >
            ${data.volumeto}
        </text>
    </symbol>
    <use 
        href="#timeDetail"
        x={xScale(data.time)! + (xScale.bandwidth() /2)}
        y={dimensions.height - dimensions.marginBottom + 5}
        width={80}
        height={20}
        transform='translate(-40,3)'
    />
    <use 
        href="#priceDetail"
        width={100}
        height={60}
        x={xScale(data.time)! + (xScale.bandwidth() /2)}
        y={
            yScale(data.high)! > (dimensions.boundedHeight / 2) 
                ? yScale(data.high)!
                : yScale(data.low)!
        }
        transform={
            yScale(data.high)! > (dimensions.boundedHeight / 2) 
                ? 'translate(-50, -40)'
                : 'translate(-50, +30)'
        }
    />
    <use 
        href="#volumeDetail"
        width={100}
        height={30}
        x={xScale(data.time)! + (xScale.bandwidth() /2)}
        y={(dimensions.height - 32)}
        transform='translate(-50, 0)'
    />
</g>;

export default Symbols;
