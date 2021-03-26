import { ResizedDimensions } from 'use-react-dimensions';
import { ScaleBand ,ScaleContinuousNumeric } from 'd3-scale';
// entity
import { HistoData, HistoDataTimeType } from '../../entities/cryptoData';

export interface ChartProps {
    xScale: ScaleBand<Date>;
    yScale: ScaleContinuousNumeric<number,number>;
    volumeScale: ScaleContinuousNumeric<number,number>;
    dimensions: ResizedDimensions;
    datas: HistoData[];
    selectedIndex: number;
    symbol: string;
    timeType: HistoDataTimeType;
    onMouseMove: React.MouseEventHandler;
    onMouseLeave: React.MouseEventHandler;
}

interface AxisProps {
    x:number;
    y: number;
}
export interface xAxisProps extends AxisProps {
    bandScale: ScaleBand<Date>;
    timeType: HistoDataTimeType;
}
export interface yAxisProps extends AxisProps {
    linearScale: ScaleContinuousNumeric<number,number>;
    xPad: number;
}
export type TickType = 'normal'|'day' | 'year' | 'month' | 'hour';
export interface xAxisTick {
    value: string;
    xPos: number;
    type: TickType;
}
export interface yAxisTick {
    value: number;
    yPos: number;
}